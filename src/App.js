import Dashboard from "./components/Dashboard";
import RegisterForm from "./components/RegisterForm";
import DataTable from "./components/DataTable";

function App() {
  return (
    <div>

      <h1
        style={{
          textAlign: "center",
          color: "#1976d2",
        }}
      >
        Ward Water Supply Measurement Dashboard
      </h1>

      <Dashboard />

      <RegisterForm />

      <DataTable />

    </div>
  );
}

export default App;