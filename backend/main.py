from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class InputData(BaseModel):
    gender: str
    ethnicity: str
    parental_education: str
    lunch: str
    test_preparation_course: str
    math_score: float
    reading_score: float
    writing_score: float
    attendance: float
    homework: float

# Load trained Keras model
model = tf.keras.models.load_model("model/student_model.h5")

@app.get("/")
def root():
    return {"message": "✅ AI EduTwin API is running"}

@app.post("/predict")
def predict(data: InputData):
    # Convert input to numpy array (you can include categorical processing here later)
    input_array = np.array([
        data.math_score,
        data.reading_score,
        data.writing_score,
        data.attendance,
        data.homework
    ]).reshape(1, -1)

    prediction = model.predict(input_array)[0][0]
    label = "Good" if prediction > 0.5 else "Needs Improvement"

    return {
        "prediction_score": float(prediction),
        "performance": label
    }
