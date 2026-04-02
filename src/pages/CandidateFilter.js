import { useEffect, useState } from "react";
import axios from "axios";

function CandidateFilter({ setActive, onApplyFilter, onResetFilter }) {
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
  const [expError, setExpError] = useState("");

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [yearError, setYearError] = useState("");

  const [percentage, setPercentage] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const [semanticQuery, setSemanticQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  // Generate Year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, i) => currentYear - i);

  //  Fetch dropdown values
  useEffect(() => {
    fetch("http://localhost:8000/api/filter_options")
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


  const buildPayload = (query) => {
    const payload = {
      skills: selectedSkills,
      education: selectedEducation,
      roles: selectedRoles,
      min_experience: minExp ? Number(minExp) : null,
      max_experience: maxExp ? Number(maxExp) : null,
      passout_start_year: startYear ? Number(startYear) : null,
      passout_end_year: endYear ? Number(endYear) : null,
      percentage: percentage ? Number(percentage) : null
    };

    if (query) {
      payload.query = query;
    }

    return payload;
  };

  const handleSemanticSearch = async () => {
    const query = semanticQuery.trim();
    if (!query) {
      setSearchError("Please enter a search query.");
      return;
    }

    setSearchError("");
    const payload = buildPayload(query);

    try {
      const response = await axios.post("http://localhost:8000/api/filter_resumes", payload, {
        headers: { "Content-Type": "application/json" }
      });

      const data = response.data;
      console.log("Semantic search response:", data);

      if (onApplyFilter) {
        onApplyFilter(data);
      }

      setActive("candidates");
    } catch (error) {
      console.error("Semantic search error:", error);
      setSearchError("Search failed. Try again.");
    }
  };

  const applyFilter = async () => {
    const payload = buildPayload();

    console.log("FINAL FILTER PAYLOAD:");
    console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await fetch("http://localhost:8000/api/filter_resumes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    console.log('log', data)

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.detail || "Failed to fetch filtered candidates");
    }

    if (onApplyFilter) {
      onApplyFilter(data);
    }

    setActive("candidates");
    } catch (error) {
      console.error("Filter API error:", error.message);
    }
  };

  const resetFilter = () => {
    setSelectedSkills([]);
    setSelectedEducation([]);
    setSelectedRoles([]);
    setMinExp("");
    setMaxExp("");
    setStartYear("");
    setEndYear("");
    setPercentage("");
    setExpError("");
    setYearError("");
    setPercentageError("");

    if (onResetFilter) {
      onResetFilter();
    } else {
      setActive("candidates");
    }
  };
  // const applyFilter = async () => {
  //   const payload = {
  //     skills: selectedSkills,
  //     education: selectedEducation,
  //     roles: selectedRoles,
  //     min_experience: minExp,
  //     max_experience: maxExp,
  //     passout_start_year: startYear,
  //     passout_end_year: endYear,
  //     percentage: percentage
  //   };
  //   console.log("FINAL FILTER PAYLOAD:");
  //   console.log(JSON.stringify(payload, null, 2));

  //   try {
  //     const response = await fetch("http://localhost:8000/api/filter_resumes", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(payload)
  //     });
  //     console.log(response)
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch filtered candidates");
  //     }

  //     const data = await response.json();
  //     console.log("Filtered candidates:", data);

  //     if (onApplyFilter) {
  //       onApplyFilter(data);
  //     }

  //     setActive("candidates");
  //   } catch (error) {
  //     console.error("Filter API error:", error);
  //   }
  // };

  //   console.log("FINAL FILTER PAYLOAD:");
  //   console.log(JSON.stringify(payload, null, 2));

  //   if (onApplyFilter) {
  //     onApplyFilter(payload);
  //   } else {
  //     setActive("candidates");
  //   }
  // };

  const handleStartYearChange = (e) => {
  const value = e.target.value;
  setStartYear(value);
    if (endYear && value && Number(endYear) < Number(value)) {
      setYearError("End Year should be greater than or equal to Start Year");
    } else {
      setYearError("");
    }
  };

  const handleEndYearChange = (e) => {
    const value = e.target.value;
    setEndYear(value);

    if (startYear && value && Number(value) < Number(startYear)) {
      setYearError("End Year should be greater than or equal to Start Year");
    } else {
      setYearError("");
    }
  };

  const handleMinExpChange = (e) => {
  const value = e.target.value;

    if (value === "" || Number(value) >= 0) {
      setMinExp(value);

      if (maxExp !== "" && Number(maxExp) < Number(value)) {
        setExpError("Max Experience should be greater than or equal to Min Experience");
      } else {
        setExpError("");
      }
    }
  };

  const handleMaxExpChange = (e) => {
    const value = e.target.value;

    if (value === "" || Number(value) >= 0) {
      setMaxExp(value);

      if (minExp !== "" && Number(value) < Number(minExp)) {
        setExpError("Max Experience should be greater than or equal to Min Experience");
      } else {
        setExpError("");
      }
    }
  };

  const handlePercentageChange = (e) => {
  const value = e.target.value;

    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setPercentage(value);
      setPercentageError("");
    } else {
      setPercentageError("Percentage must be between 0 and 100");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Candidate Filter</h3>

      {/* Semantic Search */}
      <div className="mb-4">
        <label className="fw-bold">Semantic Search</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter search query..."
            value={semanticQuery}
            onChange={(e) => setSemanticQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSemanticSearch();
              }
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSemanticSearch}
          >
            Search
          </button>
        </div>
        {searchError && <div className="text-danger mt-2">{searchError}</div>}
      </div>

      {/* Skills */}
      <div className="mb-3">
        <label className="fw-bold">Skills</label>
        <div className="dropdown">
          <button
            className="btn  dropdown-toggle w-100"
            data-bs-toggle="dropdown" style={{'borderColor': '#48a6ee'}}
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
            value={minExp}
            min="0"
            onChange={handleMinExpChange}
          />
        </div>

        <div className="col">
          <label>Max Experience</label>
          <input
            type="number"
            className="form-control"
            value={maxExp}
            // min="0"
            onChange={handleMaxExpChange}
          />
        </div>

        {expError && <div className="text-danger mt-2">{expError}</div>}
        {/* </div> */}
      </div>

      {/* Education */}
      <div className="mb-3">
        <label className="fw-bold">Education Qualification</label>
        <div className="dropdown">
          <button
            className="btn  dropdown-toggle w-100"
            data-bs-toggle="dropdown" style={{'borderColor': '#48a6ee'}}
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
            <select
              className="form-select"
              value={endYear}
              onChange={handleEndYearChange}
            >
              <option value="">Select</option>
              {years
                .filter((year) => !startYear || year >= Number(startYear))
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
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
          value={percentage}
          min="0"
          max="100"
          onChange={handlePercentageChange}
        />
        {percentageError && (
          <div className="text-danger mt-1">{percentageError}</div>
        )}
      </div>

      {/* Roles */}
      <div className="mb-4">
        <label className="fw-bold">Roles</label>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle w-100"
            data-bs-toggle="dropdown" style={{'borderColor': '#48a6ee'}}
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

      {/* Reset + Apply Filter */}
      <button
        type="button"
        className="btn btn-secondary w-100 mb-2"
        onClick={resetFilter}
      >
        Reset Filter
      </button>
      <button className="btn w-100 fs-5" onClick={applyFilter} style={{'backgroundColor': '#329beb'}}>
        Apply Filter
      </button>
    </div>
  );
}
// }
export default CandidateFilter; 