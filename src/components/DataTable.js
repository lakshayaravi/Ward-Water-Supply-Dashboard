import React, { useEffect, useState } from "react";

function DataTable() {

  const [readings, setReadings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  // NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:5000/readings")
      .then((res) => res.json())
      .then((data) => {
        setReadings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to connect to Flask Server");
        setLoading(false);
      });

  }, []);

  // Loading State
  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  // Error State
  if (error) {
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>
        {error}
      </h2>
    );
  }

  // Priority Order
  const priority = {
    "Out of Range": 1,
    "Sensor Fault": 2,
    "Missing": 3,
    "Normal": 4,
  };

  // Search + Filter + Sort
  const filteredData = readings
    .filter((item) => {

      const searchMatch =
        (item.reading_id || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (item.ward || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (item.device_id || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const filterMatch =
        filter === "ALL" || item.status === filter;

      return searchMatch && filterMatch;

    })
    .sort((a, b) => {
      return (priority[a.status] || 99) - (priority[b.status] || 99);
    });

  return (

    <div style={{ width: "95%", margin: "20px auto" }}>

      <h2>Water Flow Readings</h2>

      <input
        type="text"
        placeholder="Search Reading ID / Ward / Device"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "15px"
        }}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "10px" }}
      >
        <option value="ALL">All</option>
        <option value="Normal">Normal</option>
        <option value="Missing">Missing</option>
        <option value="Out of Range">Out of Range</option>
        <option value="Sensor Fault">Sensor Fault</option>
      </select>

      <h3>Total Records : {filteredData.length}</h3>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        width="100%"
      >

        <thead style={{ background: "#1976d2", color: "white" }}>
          <tr>
            <th>Reading ID</th>
            <th>Ward</th>
            <th>Flow (L)</th>
            <th>Valve</th>
            <th>Recorded At</th>
            <th>Device ID</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {filteredData.length === 0 ? (

            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Records Found
              </td>
            </tr>

          ) : (

            filteredData.map((item) => (

              <tr key={item.reading_id}>
                <td>{item.reading_id}</td>
                <td>{item.ward}</td>
                <td>{item.flow_litres}</td>
                <td>{item.valve_state}</td>
                <td>{item.recorded_at}</td>
                <td>{item.device_id}</td>
                <td>{item.status}</td>
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );
}

export default DataTable;