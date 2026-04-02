import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 10;

function Candidates({ filteredCandidates }) {
  const [candidates, setCandidates] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // expand work experience
  // const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [expandedSkills, setExpandedSkills] = useState(null);

  // Search & Sort states
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("None");
  const [sortOrder, setSortOrder] = useState("None");

  // company 
  const [selectedWorkExperience, setSelectedWorkExperience] = useState([]);
  const [selectedCandidateName, setSelectedCandidateName] = useState("");
  const [showWorkModal, setShowWorkModal] = useState(false);

  const fetchCandidates = (page, sortBy = "None", sortType = "None") => {
    console.log("Fetching candidates for page:", page, sortBy, sortType);

    const params = new URLSearchParams();
    params.append("page", page);

    if (sortBy) params.append("sort_by", sortBy);
    if (sortType) params.append("sort_type", sortType);

    fetch(`http://localhost:8000/api/candidates/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", JSON.stringify(data, null, 2));

        const lastItem = data[data.length - 1];
        const total = lastItem.total_record || 0;

        setTotalRecords(total);

        const rows = data.slice(0, -1);
        setCandidates(rows);
      })
      .catch((err) => console.error("Error fetching candidates:", err));
  };

  useEffect(() => {
    if (filteredCandidates && Array.isArray(filteredCandidates)) {
      setCandidates(filteredCandidates);
      setTotalRecords(filteredCandidates.length);
    } else {
      fetchCandidates(currentPage, sortField, sortOrder);
    }
  }, [currentPage, filteredCandidates]);

  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  // Apply search + sort ONLY on current page (does NOT break pagination)
  const displayedCandidates = Array.isArray(candidates)
    ? candidates.filter((c) =>
        c?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Sorting toggle
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Sort arrow icon
  const arrowIcon = (field) => {
    if (sortField !== field) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };


  // const handleSortChange = (e) => {
  //   const selectedField = e.target.value;

  //   if (!selectedField) return;

  //   let newSortOrder = "asc";

  //   if (selectedField === sortField) {
  //     newSortOrder = sortOrder === "asc" ? "desc" : "asc";
  //   }

  //   setSortField(selectedField);
  //   setSortOrder(newSortOrder);

  //   // call API immediately when sort changes
  //   fetchCandidates(1, selectedField, newSortOrder);
  //   setCurrentPage(1);
  // };

  // Apply soting
  const handleSortOptionClick = (selectedField) => {
    if (selectedField === "None") {
      setSortField("None");
      setSortOrder("asc");
      setCurrentPage(1);

      fetchCandidates(1, "", "");
      return;
    }

    let newSortOrder = "asc";

    if (selectedField === sortField) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    setSortField(selectedField);
    setSortOrder(newSortOrder);
    setCurrentPage(1);

    fetchCandidates(1, selectedField, newSortOrder);
  };

  // company modal handle
  const handleShowWorkExperience = (candidate) => {
    setSelectedWorkExperience(candidate?.work_experience || []);
    setSelectedCandidateName(candidate?.name || "Candidate");
    setShowWorkModal(true);
  };

  const handleCloseWorkModal = () => {
    setShowWorkModal(false);
    setSelectedWorkExperience([]);
    setSelectedCandidateName("");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Candidates</h3>

      {/*SEARCH + SORT */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          className="form-control w-25"
          placeholder="Search by name…"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <select
          className="form-select w-auto"
          value={sortField}
          onChange={handleSortChange}
          onClick={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="name">
            Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </option>
          <option value="year">
            Passed Year {sortField === "year" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </option>
          <option value="experience">
            Experience {sortField === "experience" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </option>
        </select> */}

        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sortField === "None"
              ? "None"
              : sortField === "name"
              ? `Name ${sortOrder === "asc" ? "↑" : "↓"}`
              : sortField === "year"
              ? `Passed Year ${sortOrder === "asc" ? "↑" : "↓"}`
              : sortField === "experience"
              ? `Experience ${sortOrder === "asc" ? "↑" : "↓"}`
              : "Sort By"}
          </button>

          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSortOptionClick("None")}
              >
                None {sortField === "None" ? (sortOrder === "None") : ""}
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSortOptionClick("name")}
              >
                Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSortOptionClick("year")}
              >
                Passed Year {sortField === "year" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </button>
            </li>

            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSortOptionClick("experience")}
              >
                Experience {sortField === "experience" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table className="table table-hover align-middle table-bordered">
          <thead className="table-light">
            <tr>
              <th
                onClick={() => toggleSort("name")}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Name <span>{arrowIcon("name")}</span>
              </th>

              <th
                onClick={() => toggleSort("email")}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Email <span>{arrowIcon("email")}</span>
              </th>

              <th>Phone</th>

              <th
                onClick={() => toggleSort("location")}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Location <span>{arrowIcon("location")}</span>
              </th>

              <th
                onClick={() => toggleSort("total_experience")}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                Experience <span>{arrowIcon("total_experience")}</span>
              </th>

              <th>Skills</th>
              <th>Education</th>
              <th>Work Experience</th>
            </tr>
          </thead>

          <tbody>
            {displayedCandidates.map((c) => (
              
              <tr key={c.candidate_id}>
                {/* Name */}
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="text-white rounded-circle me-2 d-flex align-items-center justify-content-center"
                      style={{ width: 35, height: 35, 'backgroundColor': '#48a6ee' }}
                    >
                      {c?.name ? c.name[0] : "?"}
                    </div>
                    {c?.name || "N/A"}
                  </div>
                </td>

                <td>{c?.email || "N/A"}</td>
                <td>{c?.phone_number || "N/A"}</td>
                <td>{c?.location || "N/A"}</td>
                <td>{c?.total_experience ?? "N/A"} yrs</td>

                {/* Skills */}
                <td>
                  {Array.isArray(c?.skills) && c.skills.length > 0 ? (
                    <>
                      {(expandedSkills === c.candidate_id ? c.skills : c.skills.slice(0, 4)).map((s, i) => (
                        <span key={i} className="badge  me-1 mb-1" style={{'backgroundColor': '#48a6ee'}}>
                          {s?.skill || "N/A"}
                        </span>
                      ))}

                      {c.skills.length > 3 && (
                        <div className="mt-1">
                          <button
                            onClick={() =>
                              setExpandedSkills(
                                expandedSkills === c.candidate_id ? null : c.candidate_id
                              )
                            }
                            className="btn btn-sm btn-link p-0"
                          >
                            {expandedSkills === c.candidate_id ? "Hide" : "Expand"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-muted">No Skills</span>
                  )}
                </td>

                {/* Education (ONLY education name) */}
                <td>
                  {Array.isArray(c?.education) && c.education.length > 0 ? (
                    c.education.map((e, i) => (
                      <div key={i}>{e?.education || "N/A"}</div>
                    ))
                  ) : (
                    <span className="text-muted">No Education</span>
                  )}
                </td>

                {/* Company Names only */}
                {/* <td>
                  {Array.isArray(c?.work_experience) && c.work_experience.length > 0 ? (
                    expandedCandidate === c.candidate_id ? (
                      <>
                        {c.work_experience.map((work, index) => (
                          <div key={index}>{index+1 + '. ' + work?.company_name || "N/A"}</div>
                        ))}
                        <button
                          onClick={() => setExpandedCandidate(null)}
                          className="btn btn-sm btn-link p-0 mt-1"
                        >
                          Hide
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setExpandedCandidate(c.candidate_id)}
                        className="btn btn-sm btn-link p-0  fs-5 text-decoration-none bg-primary text-white px-3 "
                      >
                        {c.work_experience.length}
                      </button>
                    )
                  ) : (
                    <span className="text-muted">No Work Experience</span>
                  )}
                </td> */}
                <td>
                  {Array.isArray(c?.work_experience) && c.work_experience.length > 0 ? (
                    <button
                      onClick={() => handleShowWorkExperience(c)}
                      className="btn btn-sm btn-link p-0 fs-5 text-decoration-none bg-primary text-white px-3"
                    >
                      {c.work_experience.length}
                    </button>
                  ) : (
                    <span className="text-muted">No Work Experience</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showWorkModal && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedCandidateName} - Work Experience
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseWorkModal}
                  ></button>
                </div>

                <div className="modal-body">
                  {selectedWorkExperience.length > 0 ? (
                    selectedWorkExperience.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                    .map((work, index) => (
                      
                      <div
                        key={index}
                        className="border rounded p-2 mb-2 bg-light"
                      >
                        {/* <p>{work}</p> */}
                        <div><strong>{index + 1}. {work?.company_name || "N/A"}</strong></div>
                          <div>Role: {work?.role || "N/A"}</div>
                          {/* <div>Present: {work?.is_present ? "Yes" : "No"}</div> */}
                          <div>Start Date: {work?.start_date || "N/A"}</div>
                          <div>End Date: {work?.end_date || "N/A"}</div>
                          <div>Location: {work?.location || "N/A"}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted mb-0">No Work Experience</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-danger"
                    onClick={handleCloseWorkModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    {totalPages > 1 && (() => {
      const pagesPerGroup = 5;
      const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);

      const startPage = currentGroup * pagesPerGroup + 1;
      const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

      const pageNumbers = [];
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return (
        <div className="d-flex justify-content-center align-items-center mt-4">

          {/* Left Arrow - Previous Group */}
          <button
            onClick={() => setCurrentPage(Math.max(startPage - pagesPerGroup, 1))}
            disabled={startPage === 1}
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              backgroundColor: startPage === 1 ? "#ccc" : "green",
              color: startPage === 1 ? "#007bff" : "white",
              border: "1px solid #007bff",
              fontWeight: "bolder",
              // lineHeight: "40px",
              padding: 0,
              marginRight: "10px",
              cursor: startPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            &lt;
          </button>

          {/* Page Numbers */}
          <div className="d-flex">
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  margin: "0 5px",
                  backgroundColor: currentPage === page ? "#007bff" : "#fff",
                  color: currentPage === page ? "#fff" : "#007bff",
                  border: "1px solid #007bff",
                  fontWeight: currentPage === page ? "bold" : "normal",
                  lineHeight: "40px",
                  padding: 0,
                }}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Right Arrow - Next Group */}
          <button
            onClick={() => setCurrentPage(Math.min(startPage + pagesPerGroup, totalPages))}
            disabled={endPage === totalPages}
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              backgroundColor: endPage === totalPages ? "#ccc" : "green",
              color: "white",
              border: "1px solid #007bff",
              fontWeight: "bolder",
              // lineHeight: "40px",
              padding: 0,
              marginLeft: "10px",
              cursor: endPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            &gt;
          </button>
        </div>
      );
    })()}

    </div>
  );
}

export default Candidates;