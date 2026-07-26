from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from validation import validate

app = Flask(__name__)
CORS(app)

DATABASE = "water.db"

# Database Connection
def connect():
    return sqlite3.connect(DATABASE)

# Home API
@app.route("/")
def home():
    return "Water Supply Backend Running Successfully"

# Get All Readings
@app.route("/readings", methods=["GET"])
def get_readings():

    conn = connect()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM water_readings")

    rows = cursor.fetchall()

    conn.close()

    data = []

    for row in rows:

        data.append({
            "reading_id": row[0],
            "ward": row[1],
            "flow_litres": row[2],
            "valve_state": row[3],
            "recorded_at": row[4],
            "device_id": row[5],
            "status": row[6]
        })

    return jsonify(data)

# Add New Reading
@app.route("/readings", methods=["POST"])
def add_reading():

    data = request.json

    errors = validate(data)

    if errors:
        return jsonify({"errors": errors}), 400

    flow = float(data["flow_litres"])

    status = "Normal"

    if flow > 5000:
        status = "Out of Range"

    conn = connect()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO water_readings
    VALUES(?,?,?,?,?,?,?)
    """, (
        data["reading_id"],
        data["ward"],
        flow,
        data["valve_state"],
        data["recorded_at"],
        data["device_id"],
        status
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Reading Saved Successfully"
    })

if __name__ == "__main__":
    app.run(debug=True)