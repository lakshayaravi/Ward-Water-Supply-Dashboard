import React, { useEffect, useState } from "react";

function Dashboard() {

  const [readings, setReadings] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/readings")
      .then((res) => res.json())
      .then((data) => setReadings(data))
      .catch((err) => console.log(err));
  }, []);

  // Total Readings
  const totalReadings = readings.length;

  // Only use NORMAL readings for calculations
  const flowValues = readings
    .filter(
      (item) =>
        item.status === "Normal" &&
        item.flow_litres !== null &&
        item.flow_litres !== ""
    )
    .map((item) => Number(item.flow_litres));

  // Total Flow
  const totalFlow = flowValues.reduce((sum, value) => sum + value, 0);

  // Average Flow
  const averageFlow =
    flowValues.length > 0
      ? (totalFlow / flowValues.length).toFixed(2)
      : 0;

  // Maximum Flow
  const maxFlow =
    flowValues.length > 0
      ? Math.max(...flowValues)
      : 0;

  // Minimum Flow
  const minFlow =
    flowValues.length > 0
      ? Math.min(...flowValues)
      : 0;

  // Alert Count
  const alertCount = readings.filter(
    (item) => item.status !== "Normal"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
        margin: "20px",
      }}
    >

      <div style={cardStyle("#4CAF50")}>
        <h3>Total Readings</h3>
        <h1>{totalReadings}</h1>
      </div>

      <div style={cardStyle("#2196F3")}>
        <h3>Average Flow</h3>
        <h1>{averageFlow} L</h1>
      </div>

      <div style={cardStyle("#F44336")}>
        <h3>Alerts</h3>
        <h1>{alertCount}</h1>
      </div>

      <div style={cardStyle("#9C27B0")}>
        <h3>Maximum Flow</h3>
        <h1>{maxFlow} L</h1>
      </div>

      <div style={cardStyle("#FF9800")}>
        <h3>Minimum Flow</h3>
        <h1>{minFlow} L</h1>
      </div>

    </div>
  );
}

const cardStyle = (color) => ({
  background: color,
  color: "white",
  width: "220px",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
});

export default Dashboard;