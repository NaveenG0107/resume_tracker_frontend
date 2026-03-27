import { useEffect, useState } from "react";

function CandidateFilter({ setActive }) {
  const [options, setOptions] = useState({
    skills: [],
    education: [],
    roles: []
  });

  // Store IDs now (NOT names)
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [percentage, setPercentage] = useState("");

  // Generate Year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  //  Fetch dropdown values
  useEffect(() => {
    fetch("http://localhost:8000/api/show_filter")
      .then((res) => res.json())
      .then((data) => {
        setOptions({
          skills: data.data.skills || [],
          education: data.data.education || [],
          roles: data.data.roles || []
        });
      })
      .catch((err) => console.log("Error fetching options:", err));
  }, []);

  // Checkbox toggle → store IDs
  const toggleCheckbox = (id, list, setList) => {
    if (list.includes(id)) {
      setList(list.filter((v) => v !== id));
    } else {
      setList([...list, id]);
    }
  };

  // Apply Filter
  const applyFilter = () => {
    const payload = {
      skills: selectedSkills,      
      education: selectedEducation, 
      roles: selectedRoles,       
      min_experience: minExp,
      max_experience: maxExp,
      passout_start_year: startYear,
      passout_end_year: endYear,
      percentage: percentage
    };

    
    console.log("FINAL FILTER PAYLOAD:");
    console.log(JSON.stringify(payload, null, 2));
    ;

    setActive("dashboard");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Candidate Filter</h3>

      {/* Skills */}
      <div className="mb-3">
        <label className="fw-bold">Skills</label>
        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle w-100"
            data-bs-toggle="dropdown"
          >
            {selectedSkills.length > 0
              ? `${selectedSkills.length} selected`
              : "Select Skills"}
          </button>

          <ul className="dropdown-menu p-2" style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}>
            {options.skills.map((s) => (
              <li key={s.id}>
                <label className="dropdown-item">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedSkills.includes(s.id)}
                    onChange={() => toggleCheckbox(s.id, selectedSkills, setSelectedSkills)}
                  />
                  {s.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Experience */}
      <div className="row mb-3">
        <div className="col">
          <label>Min Experience</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setMinExp(e.target.value)}
          />
        </div>

        <div className="col">
          <label>Max Experience</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setMaxExp(e.target.value)}
          />
        </div>
      </div>

      {/* Education */}
      <div className="mb-3">
        <label className="fw-bold">Education Qualification</label>
        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle w-100"
            data-bs-toggle="dropdown"
          >
            {selectedEducation.length > 0
              ? `${selectedEducation.length} selected`
              : "Select Education"}
          </button>

          <ul className="dropdown-menu p-2" style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}>
            {options.education.map((edu) => (
              <li key={edu.id}>
                <label className="dropdown-item">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedEducation.includes(edu.id)}
                    onChange={() => toggleCheckbox(edu.id, selectedEducation, setSelectedEducation)}
                  />
                  {edu.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Year of Passout */}
      <div className="mb-3">
        <label className="fw-bold">Year of Passout</label>
        <div className="row">
          <div className="col">
            <label>Start Year</label>
            <select className="form-select" onChange={(e) => setStartYear(e.target.value)}>
              <option value="">Select</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="col">
            <label>End Year</label>
            <select className="form-select" onChange={(e) => setEndYear(e.target.value)}>
              <option value="">Select</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Percentage */}
      <div className="mb-3">
        <label>Percentage</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setPercentage(e.target.value)}
        />
      </div>

      {/* Roles */}
      <div className="mb-4">
        <label className="fw-bold">Roles</label>

        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle w-100"
            data-bs-toggle="dropdown"
          >
            {selectedRoles.length > 0
              ? `${selectedRoles.length} selected`
              : "Select Roles"}
          </button>

          <ul className="dropdown-menu p-2" style={{ width: "100%", maxHeight: "200px", overflowY: "auto" }}>
            {options.roles.map((role) => (
              <li key={role.id}>
                <label className="dropdown-item">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => toggleCheckbox(role.id, selectedRoles, setSelectedRoles)}
                  />
                  {role.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Apply Filter */}
      <button className="btn btn-success w-100" onClick={applyFilter}>
        Apply Filter
      </button>
    </div>
  );
}

export default CandidateFilter; 