def validate(data):
    errors = []

    if not data.get("reading_id"):
        errors.append("Reading ID is required")

    if not data.get("ward"):
        errors.append("Ward is required")

    if data.get("flow_litres") == "" or data.get("flow_litres") is None:
        errors.append("Flow Litres is required")

    else:
        try:
            flow = float(data["flow_litres"])

            if flow < 0:
                errors.append("Flow cannot be negative")

            if flow > 5000:
                errors.append("Flow is outside the normal range")

        except:
            errors.append("Invalid Flow Value")

    if data.get("valve_state") not in ["OPEN", "CLOSED", "MAINTENANCE"]:
        errors.append("Invalid Valve State")

    if not data.get("recorded_at"):
        errors.append("Recorded Time is required")

    if not data.get("device_id"):
        errors.append("Device ID is required")

    return errors