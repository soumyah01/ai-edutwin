"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    gender: "female",
    ethnicity: "group B",
    parental_education: "associate's degree",
    lunch: "standard",
    test_preparation_course: "none",
    math_score: 78,
    reading_score: 85,
    writing_score: 80,
    attendance: 0.9,
    homework: 0.8,
  });

  const [prediction, setPrediction] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = ["math_score", "reading_score", "writing_score", "attendance", "homework"].includes(name)
      ? parseFloat(value)
      : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData);
      setPrediction(response.data.performance);
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction("Failed to get prediction");
    }
  };

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Student Performance Predictor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="ethnicity" value={formData.ethnicity} onChange={handleChange} required>
          <option value="">Select Ethnicity</option>
          <option value="group A">Group A</option>
          <option value="group B">Group B</option>
          <option value="group C">Group C</option>
          <option value="group D">Group D</option>
          <option value="group E">Group E</option>
        </select>
        <select name="parental_education" value={formData.parental_education} onChange={handleChange} required>
          <option value="">Parent Education</option>
          <option value="high school">High School</option>
          <option value="some college">Some College</option>
          <option value="associate's degree">Associate's Degree</option>
          <option value="bachelor's degree">Bachelor's Degree</option>
          <option value="master's degree">Master's Degree</option>
        </select>
        <select name="lunch" value={formData.lunch} onChange={handleChange} required>
          <option value="">Lunch Type</option>
          <option value="standard">Standard</option>
          <option value="free/reduced">Free/Reduced</option>
        </select>
        <select name="test_preparation_course" value={formData.test_preparation_course} onChange={handleChange} required>
          <option value="">Test Prep</option>
          <option value="none">None</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="number"
          name="math_score"
          placeholder="Math Score"
          value={formData.math_score}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="reading_score"
          placeholder="Reading Score"
          value={formData.reading_score}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="writing_score"
          placeholder="Writing Score"
          value={formData.writing_score}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="attendance"
          step="0.01"
          placeholder="Attendance (e.g. 0.9)"
          value={formData.attendance}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="homework"
          step="0.01"
          placeholder="Homework (e.g. 0.8)"
          value={formData.homework}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Predict Performance
        </button>
      </form>
      {prediction && (
        <div className="mt-6 text-xl font-semibold">
          Predicted Class: {prediction}
        </div>
      )}
    </main>
  );
}
