import sqlite3
import random
import time
from datetime import datetime

# Store last 5 readings for smoothing
last_readings = []

while True:

    flow = random.randint(420, 720)

    # Occasionally generate an impossible value
    if random.randint(1, 20) == 5:
        flow = 25000

    # Plausibility Check
    if flow < 0 or flow > 5000:
        print("Rejected:", flow)
    else:

        last_readings.append(flow)

        if len(last_readings) > 5:
            last_readings.pop(0)

        smooth_flow = round(sum(last_readings) / len(last_readings), 2)

        conn = sqlite3.connect("water.db")
        cursor = conn.cursor()

        reading_id = "SIM" + datetime.now().strftime("%H%M%S")

        cursor.execute("""
        INSERT INTO water_readings
        VALUES (?,?,?,?,?,?,?)
        """, (
            reading_id,
            "Ward-1",
            smooth_flow,
            "OPEN",
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "SIM001",
            "Normal"
        ))

        conn.commit()
        conn.close()

        print("Inserted:", smooth_flow)

    time.sleep(5)