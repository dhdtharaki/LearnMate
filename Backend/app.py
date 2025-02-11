from flask import Flask, request, jsonify
from model.model_loader import load_model
from utils.helpers import recommend_activities_for_affective_domain,recommend_activities_for_cognitive_domain,recommend_activities_for_metacognitive_domain,recommend_activities_for_psycimoto_domain
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
