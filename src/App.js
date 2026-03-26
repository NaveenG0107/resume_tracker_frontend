import { useState } from "react";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateFilter from "./pages/CandidateFilter";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "candidates":
        return <Candidates />;
      case "candidateFilter":
        return <CandidateFilter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Page Content */}
      <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;