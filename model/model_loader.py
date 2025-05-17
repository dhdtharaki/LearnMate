import os
import pickle

def load_model(filename):
    """
    Load a machine learning model from the 'model/models/' directory.
    """
    model_path = os.path.join("model", "models", filename)
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file '{filename}' not found.")
    with open(model_path, "rb") as file:
        model = pickle.load(file)
    return model
