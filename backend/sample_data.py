import sqlite3

conn = sqlite3.connect("water.db")
cursor = conn.cursor()

# Delete old records (optional)
cursor.execute("DELETE FROM water_readings")

sample_data = [

("R001","Ward-1",520,"OPEN","2026-07-25 08:00","DEV001","Normal"),
("R002","Ward-2",480,"OPEN","2026-07-25 08:10","DEV002","Normal"),
("R003","Ward-3",610,"OPEN","2026-07-25 08:20","DEV003","Normal"),
("R004","Ward-4",450,"OPEN","2026-07-25 08:30","DEV004","Normal"),
("R005","Ward-5",700,"OPEN","2026-07-25 08:40","DEV005","Normal"),
("R006","Ward-1",530,"OPEN","2026-07-25 08:50","DEV001","Normal"),
("R007","Ward-2",470,"OPEN","2026-07-25 09:00","DEV002","Normal"),
("R008","Ward-3",590,"OPEN","2026-07-25 09:10","DEV003","Normal"),
("R009","Ward-4",510,"OPEN","2026-07-25 09:20","DEV004","Normal"),
("R010","Ward-5",650,"OPEN","2026-07-25 09:30","DEV005","Normal"),

("R011","Ward-1",500,"OPEN","2026-07-25 09:40","DEV001","Normal"),
("R012","Ward-2",480,"OPEN","2026-07-25 09:50","DEV002","Normal"),
("R013","Ward-3",620,"OPEN","2026-07-25 10:00","DEV003","Normal"),
("R014","Ward-4",560,"OPEN","2026-07-25 10:10","DEV004","Normal"),
("R015","Ward-5",690,"OPEN","2026-07-25 10:20","DEV005","Normal"),
("R016","Ward-1",510,"OPEN","2026-07-25 10:30","DEV001","Normal"),
("R017","Ward-2",470,"OPEN","2026-07-25 10:40","DEV002","Normal"),
("R018","Ward-3",610,"OPEN","2026-07-25 10:50","DEV003","Normal"),
("R019","Ward-4",530,"OPEN","2026-07-25 11:00","DEV004","Normal"),
("R020","Ward-5",640,"OPEN","2026-07-25 11:10","DEV005","Normal"),

("R021","Ward-1",520,"OPEN","2026-07-25 11:20","DEV001","Normal"),
("R022","Ward-2",460,"OPEN","2026-07-25 11:30","DEV002","Normal"),
("R023","Ward-3",630,"OPEN","2026-07-25 11:40","DEV003","Normal"),
("R024","Ward-4",540,"OPEN","2026-07-25 11:50","DEV004","Normal"),
("R025","Ward-5",680,"OPEN","2026-07-25 12:00","DEV005","Normal"),
("R026","Ward-1",515,"OPEN","2026-07-25 12:10","DEV001","Normal"),
("R027","Ward-2",475,"OPEN","2026-07-25 12:20","DEV002","Normal"),
("R028","Ward-3",605,"OPEN","2026-07-25 12:30","DEV003","Normal"),
("R029","Ward-4",555,"OPEN","2026-07-25 12:40","DEV004","Normal"),
("R030","Ward-5",670,"OPEN","2026-07-25 12:50","DEV005","Normal"),

("R031","Ward-1",525,"OPEN","2026-07-25 13:00","DEV001","Normal"),
("R032","Ward-2",485,"OPEN","2026-07-25 13:10","DEV002","Normal"),
("R033","Ward-3",615,"OPEN","2026-07-25 13:20","DEV003","Normal"),
("R034","Ward-4",545,"OPEN","2026-07-25 13:30","DEV004","Normal"),
("R035","Ward-5",675,"OPEN","2026-07-25 13:40","DEV005","Normal"),

# Missing Value
("R036","Ward-1",None,"OPEN","2026-07-25 13:50","DEV001","Missing"),

# Out of Range
("R037","Ward-2",25000,"OPEN","2026-07-25 14:00","DEV002","Out of Range"),

# Sensor Fault
("R038","Ward-3",777,"OPEN","2026-07-25 14:10","DEV003","Sensor Fault"),
("R039","Ward-3",777,"OPEN","2026-07-25 14:20","DEV003","Sensor Fault"),
("R040","Ward-3",777,"OPEN","2026-07-25 14:30","DEV003","Sensor Fault")

]

cursor.executemany("""
INSERT OR REPLACE INTO water_readings
VALUES (?,?,?,?,?,?,?)
""", sample_data)

conn.commit()
conn.close()

print("40 Sample Records Inserted Successfully!")