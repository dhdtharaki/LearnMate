from flask import Flask, request, jsonify
from model.model_loader import load_model
from utils.helpers import recommend_activities_for_affective_domain,recommend_activities_for_cognitive_domain,recommend_activities_for_metacognitive_domain,recommend_activities_for_psychomotor_domain
import numpy as np
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS  # Import CORS
from datetime import datetime


# Initialize Flask app
app = Flask(__name__)

CORS(app)


# Configuration for MongoDB
app.config['MONGO_URI'] = "mongodb+srv://learnmate24:XuoLCMtDgd5UPb09@cluster0.rbido.mongodb.net/myDatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)
# Load all models
models = {
    "model_1": load_model("lr_ADmodel.pkl"),
    "model_2": load_model("lr_model.pkl"),
    "model_3": load_model("qda_model.pkl"),
    "model_4": load_model("voting_classifier.pkl")
}


# MongoDB collection
db = mongo.db.users
db_predictions = mongo.db.predictions
db_activities = mongo.db.activities

@app.route('/register', methods=['POST'])
def register_user():
    try:
        # Get data from the frontend
        user_data = request.json

        # Validate required fields
        required_fields = ['age', 'asdFamilyMember', 'email', 'gender', 'name', 'password']
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"'{field}' is required."}), 400

        # Check if the email is already registered
        if db.find_one({"email": user_data['email']}):
            return jsonify({"error": "Email is already registered."}), 400

        # Hash the password
        hashed_password = generate_password_hash(user_data['password'])

        # Create the user document
        user = {
            "age": user_data['age'],
            "asdFamilyMember": user_data['asdFamilyMember'],
            "email": user_data['email'],
            "gender": user_data['gender'],
            "name": user_data['name'],
            "password": hashed_password
        }

        # Insert the user into the database
        db.insert_one(user)

        return jsonify({"message": "User registered successfully."}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/login', methods=['POST'])
def login_user():
    try:
        # Get data from the frontend
        login_data = request.json

        # Validate required fields
        required_fields = ['email', 'password']
        for field in required_fields:
            if field not in login_data:
                return jsonify({"error": f"'{field}' is required."}), 400

        # Find the user by email
        user = db.find_one({"email": login_data['email']})
        if not user:
            return jsonify({"error": "Invalid email or password."}), 401

        # Verify the password
        if not check_password_hash(user['password'], login_data['password']):
            return jsonify({"error": "Invalid email or password."}), 401

        user_data = {
            "age": user['age'],
            "asdFamilyMember": user['asdFamilyMember'],
            "email": user['email'],
            "gender": user['gender'],
            "name": user['name']
        }

        return jsonify({"message": "Login successful.", "user": user_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update', methods=['PUT'])
def update_user():
    try:
        # Get data from the frontend
        user_data = request.json

        # Validate the presence of email
        if 'email' not in user_data:
            return jsonify({"error": "'email' is required to identify the user."}), 400

        # Find the user in the database by email
        user = db.find_one({"email": user_data['email']})
        if not user:
            return jsonify({"error": "User not found."}), 404

        # Fields that are allowed to be updated
        updatable_fields = ['age', 'asdFamilyMember', 'gender', 'name']

        # Prepare update data while ignoring password
        update_data = {}
        for field in updatable_fields:
            if field in user_data:
                update_data[field] = user_data[field]

        # If no updatable fields are provided
        if not update_data:
            return jsonify({"error": "No valid fields provided for update."}), 400

        # Update the user document in the database
        db.update_one({"email": user_data['email']}, {"$set": update_data})

        return jsonify({"message": "User updated successfully."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predictions', methods=['GET'])
def get_predictions_by_email():
    email = request.args.get('email')  # Get email from query parameters
    if not email:
        return jsonify({"error": "Email query parameter is required"}), 400

    # Query MongoDB for predictions with the given email
    predictions = list(db_predictions.find({"email": email}, {"_id": 0}))  # Exclude `_id` field from results
    if not predictions:
        return jsonify({"message": "No predictions found for the given email"}), 404

    return jsonify(predictions), 200

@app.route('/save-activity', methods=['POST'])
def save_activity():
    try:
        # Parse JSON data from the request
        data = request.json
        
        # Validate required fields
        required_fields = ["email", "activity", "points", "retries", "timeTaken"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"'{field}' is required"}), 400

        # Prepare the filter and update document
        filter_query = {"email": data["email"], "activity": data["activity"]}  # Match on email and activity
        update_data = {
            "$set": {
                "email": data["email"],
                "activity": data["activity"],
                "points": data["points"],
                "retries": data["retries"],
                "timeTaken": data["timeTaken"],
                "date": datetime.now().strftime("%d/%m/%Y")  # Automatically add the date
            }
        }

        # Perform an upsert: update if the document exists, insert if it doesn't
        result = db_activities.update_one(filter_query, update_data, upsert=True)
        
        # Prepare response message
        if result.matched_count > 0:
            message = "Activity updated successfully"
        else:
            message = "Activity saved successfully"

        # Include the updated/inserted document
        activity_data = {
            "email": data["email"],
            "activity": data["activity"],
            "points": data["points"],
            "retries": data["retries"],
            "timeTaken": data["timeTaken"],
            "date": datetime.now().strftime("%d/%m/%Y")
        }

        return jsonify({"message": message, "data": activity_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route('/cognitive-predict', methods=['POST'])
def predict_cognitive_level_api():
    try:
        # Extract JSON data
        data = request.get_json()

        # Validate input
        required_fields = [
            'gender', 'age', 'family_history', 'problem_solving',
            'visual_learning_pref', 'response_to_guidance',
            'task_independece', 'object_identification', 'error_correction'
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Get the input features
        input_features = [
            data['gender'],
            data['age'],
            data['family_history'],
            data['problem_solving'],
            data['visual_learning_pref'],
            data['response_to_guidance'],
            data['task_independece'],
            data['object_identification'],
            data['error_correction']
        ]

        # Predict cognitive level
        model = models["model_2"]  # Use the second model
        predicted_cognitive_level = model.predict([input_features])[0]

        print(predicted_cognitive_level)

        # Get recommendations
        recommended_activities = recommend_activities_for_cognitive_domain(data['age'], predicted_cognitive_level)

        # Map cognitive level to readable format
        cognitive_mapping = {0: "Mild", 1: "Moderate", 2: "Severe"}
        predicted_level = cognitive_mapping[predicted_cognitive_level]

        predictions = {
            "email": data.get("email"),
            "label": predicted_level,
            "domain": "Cognitive Domain",
            "date": datetime.now().strftime("%d/%m/%Y"),  # Format: DD/MM/YYYY
            "recommendation": recommended_activities
        }

        db_predictions.insert_one(predictions)

        # Return the response
        return jsonify({
            "prediction": predicted_level,
            "recommendation": recommended_activities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

#Predict Metacognitive level
@app.route('/meta-cognitive-predict', methods=['POST'])
def predict_metacognitive_level_api():
    try:
        # Extract JSON data
        data = request.get_json()

        # Validate input
        required_fields = [
            'Gender', 'Age', 'Family_History', 'Concentration',
            'Individual_Tasks_Planning', 'Remember_Steps',
            'Finish_Chores_Properly', 'Identify_Goals', 'Recognize_Mistakes', 'Prioritize_Tasks'
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Get the input features
        input_features = [
            data['Gender'],
            data['Age'],
            data['Family_History'],
            data['Concentration'],
            data['Individual_Tasks_Planning'],
            # data['response_to_guidance'],
            data['Remember_Steps'],
            data['Finish_Chores_Properly'],
            data['Identify_Goals'],
            data['Recognize_Mistakes'],
            data['Prioritize_Tasks']
        ]

        # Predict Metacognitive level
        model = models["model_3"]  # Use the third model
        predicted_cognitive_level = model.predict([input_features])[0]

        print(predicted_cognitive_level, 'predicted_cognitive_level')

        # Get recommendations
        recommended_activities = recommend_activities_for_metacognitive_domain(data['Age'], predicted_cognitive_level)

        # Map cognitive level to readable format
        meta_cognitive_mapping = {0: "Mild", 1: "Moderate", 2: "Severe"}
        predicted_level = meta_cognitive_mapping[predicted_cognitive_level]

        predictions = {
            "email": data.get("email"),
            "label": predicted_level,
            "domain": "Meta-Cognitive Domain",
            "date": datetime.now().strftime("%d/%m/%Y"),  # Format: DD/MM/YYYY
            "recommendation": recommended_activities
        }

        db_predictions.insert_one(predictions)
        # Return the response
        return jsonify({
            "prediction": predicted_level,
            "recommendation": recommended_activities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

#Predict Psychomotor level
@app.route('/psycomotor-predict', methods=['POST'])
def psycomotor_level_api():
    try:
        # Extract JSON data
        data = request.get_json()

        # Validate input
        required_fields = [
            "Gender", "Age", "Family_ASD_History",
            "Balance_and_Stability", "Grip_Strength", "Coordination",
            "Hand_Eye_Coordination", "Object_Manipulation",
            "Independent_Use_Utensils", "Button_Zip_Clothes"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Get the input features
        input_features = [
            data['Gender'],
            data['Age'],
            data['Family_ASD_History'],
            data['Balance_and_Stability'],
            data['Grip_Strength'],
            data['Coordination'],
            data['Hand_Eye_Coordination'],
            data['Object_Manipulation'],
            data['Independent_Use_Utensils'],
            data['Button_Zip_Clothes']
        ]

        # Predict cognitive level
        model = models["model_4"]  # Use the second model
        predicted_psychomotor_level = model.predict([input_features])[0]

        print(predicted_psychomotor_level)

        psychomotor_mapping = {0: "Mild", 1: "Moderate", 2: "Severe"}
        predicted_level = psychomotor_mapping[predicted_psychomotor_level]

        # Get recommendations
        recommended_activities = recommend_activities_for_psychomotor_domain(predicted_level, data['Age'])

        # Map cognitive level to readable format
        predictions = {
            "email": data.get("email"),
            "label": predicted_level,
            "domain": "Psycho-Motor Domain",
            "date": datetime.now().strftime("%d/%m/%Y"),  # Format: DD/MM/YYYY
            "recommendation": recommended_activities
        }

        db_predictions.insert_one(predictions)

        # Return the response
        return jsonify({
            "prediction": predicted_level,
            "recommendation": recommended_activities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400    


# Run the app
if __name__ == '__main__':
    app.run(debug=True)
