import { useState } from "react";

function CandidateFilter() {
  const [skills, setSkills] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");

  const handleFilter = () => {
    console.log({ skills, minExp, maxExp });
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Candidate Filter</h3>

      <input
        className="form-control mb-3"
        placeholder="Skills"
        onChange={(e) => setSkills(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Min Experience"
        onChange={(e) => setMinExp(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Max Experience"
        onChange={(e) => setMaxExp(e.target.value)}
      />

      <button className="btn btn-success" onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
}

export default CandidateFilter;