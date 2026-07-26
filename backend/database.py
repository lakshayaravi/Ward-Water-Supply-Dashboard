import sqlite3

DATABASE = "water.db"

def create_database():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS water_readings (
        reading_id TEXT PRIMARY KEY,
        ward TEXT NOT NULL,
        flow_litres REAL,
        valve_state TEXT NOT NULL,
        recorded_at TEXT NOT NULL,
        device_id TEXT NOT NULL,
        status TEXT
    )
    """)

    conn.commit()
    conn.close()

    print("✅ Database Created Successfully!")

if __name__ == "__main__":
    create_database()