import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderNavbar from "./components/header";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateFilter from "./pages/CandidateFilter";

function App() {
  const [filteredCandidates, setFilteredCandidates] = useState(null);

  const handleApplyFilter = (data) => {
    setFilteredCandidates(Array.isArray(data) ? data : data?.data || []);
  };

  const handleResetFilter = () => {
    setFilteredCandidates(null);
  };

  return (
    <Router>
      <HeaderNavbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/candidates"
              element={<Candidates filteredCandidates={filteredCandidates} />}
            />
            <Route
              path="/candidate-filter"
              element={
                <CandidateFilter
                  onApplyFilter={handleApplyFilter}
                  onResetFilter={handleResetFilter}
                />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



