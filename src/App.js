import { useState } from "react";
import Sidebar from "./components/Sidebar";
import HeaderNavbar from "./components/header";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateFilter from "./pages/CandidateFilter";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [filteredCandidates, setFilteredCandidates] = useState(null);

  const handleApplyFilter = (data) => {
    setFilteredCandidates(Array.isArray(data) ? data : data?.data || []);
    setActivePage("candidates");
  };

  const handleResetFilter = () => {
    setFilteredCandidates(null);
    setActivePage("candidates");
  };

  const renderPage = () => {
    switch (activePage) {
      case "candidates":
        return <Candidates filteredCandidates={filteredCandidates} />;
      case "candidateFilter":
        return (
          <CandidateFilter
            setActive={setActivePage}
            onApplyFilter={handleApplyFilter}
            onResetFilter={handleResetFilter}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <HeaderNavbar />
      <div className="d-flex">
      
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />
      
      {/* Header */}
      {/* <div style={{ flex: 1, display: "flex", flexDirection: "column" }}> */}
      

      {/* Page Content */}
      <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh" }}>
        {renderPage()}
      </div>
    </div>
  

    </div>
    
);}
export default App;