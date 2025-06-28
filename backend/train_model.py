import tensorflow as tf
import numpy as np

# Simulated dataset (you'll later replace with real data or API data)
# Each row = [study_hours, attendance_pct, sleep_hours, test_score, participation]
X = np.array([
    [3, 80, 6, 60, 5],
    [5, 90, 7, 75, 8],
    [1, 60, 5, 40, 2],
    [6, 95, 8, 85, 9],
    [2, 70, 6, 50, 4],
    [4, 85, 7, 70, 7]
])

# Labels: 1 = Good performance, 0 = Poor performance
y = np.array([0, 1, 0, 1, 0, 1])

# Define the model
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(5,)),
    tf.keras.layers.Dense(10, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')  # Binary classification
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X, y, epochs=50, verbose=0)

# Save the model
model.save("student_model.h5")
print("✅ Model trained and saved as student_model.h5")
