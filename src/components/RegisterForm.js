import React, { useState } from "react";

function RegisterForm() {
  const [readingId, setReadingId] = useState("");
  const [ward, setWard] = useState("");
  const [flowLitres, setFlowLitres] = useState("");
  const [valveState, setValveState] = useState("OPEN");
  const [recordedAt, setRecordedAt] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      reading_id: readingId,
      ward: ward,
      flow_litres: flowLitres,
      valve_state: valveState,
      recorded_at: recordedAt,
      device_id: deviceId,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/readings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);

        setReadingId("");
        setWard("");
        setFlowLitres("");
        setValveState("OPEN");
        setRecordedAt("");
        setDeviceId("");
      } else {
        alert(result.errors ? result.errors.join("\n") : "Error saving data");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the Flask server.");
    }
  };

  return (
    <div style={{ width: "450px", margin: "30px auto" }}>
      <h2>Water Flow Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Reading ID"
          value={readingId}
          onChange={(e) => setReadingId(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Ward"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Flow Litres"
          value={flowLitres}
          onChange={(e) => setFlowLitres(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={valveState}
          onChange={(e) => setValveState(e.target.value)}
        >
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>

        <br /><br />

        <input
          type="datetime-local"
          value={recordedAt}
          onChange={(e) => setRecordedAt(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Device ID"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Save Reading</button>
      </form>
    </div>
  );
}

export default RegisterForm;