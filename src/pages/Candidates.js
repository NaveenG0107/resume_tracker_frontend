import { computeHeadingLevel } from "@testing-library/dom";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 1;

function Candidates({ filteredCandidates }) {
  const [candidates, setCandidates] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // expand work experience
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [expandedSkills, setExpandedSkills] = useState(null);

  // Search & Sort states
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch from backend
  const fetchCandidates = (page) => {
    console.log("Fetching candidates for page:", page);

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("sort_by", "name");
    params.append("sort_type", "asc");

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
      fetchCandidates(currentPage);
    }
  }, [currentPage, filteredCandidates]);

  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  // Apply search + sort ONLY on current page (does NOT break pagination)
  const processedCandidates = candidates
    .filter((c) =>
      c?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;

      let valA = a[sortField] || "";
      let valB = b[sortField] || "";

      if (typeof valA === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

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

        <select
          className="form-select w-auto"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="total_experience">Experience</option>
        </select>
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
              <th>Company Names</th>
            </tr>
          </thead>

          <tbody>
            {processedCandidates.map((c) => (
              
              <tr key={c.candidate_id}>
                {/* Name */}
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-danger text-white rounded-circle me-2 d-flex align-items-center justify-content-center"
                      style={{ width: 35, height: 35 }}
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
                {/* <td>
                  {Array.isArray(c?.skills) && c.skills.length > 0 ? (
                    c.skills.map((s, i) => (
                      <span key={i} className="badge bg-success me-1">
                        {s?.skill || "N/A"}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">No Skills</span>
                  )}
                </td> */}
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
                <td>
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
                        {c.total_experience || c.work_experience.length}
                      </button>
                    )
                  ) : (
                    <span className="text-muted">No Work Experience</span>
                  )}
                </td>

                {/* <td>
                  {Array.isArray(c?.work_experience) &&
                  c.work_experience.length > 0 ? (
                    c.work_experience.map((w, i) => (
                      <div key={i}>{w?.company_name || "N/A"}</div>
                    ))
                  ) : (
                    <span className="text-muted">No Work Experience</span>
                  )}
                </td> */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (unchanged and fully working) */}
      {/* {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          
          <button
            style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "1px solid #198754",
                    lineHeight: "40px",
                    padding: 0,
                }}>
                    &lt;
            </button>
          <ul className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const active = currentPage === page;

              return (
                <li key={page} className="page-item mx-1">
                  <button
                    onClick={() => setCurrentPage(page)}
                    className="page-link"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      backgroundColor: active ? "#198754" : "#fff",
                      color: active ? "#fff" : "#198754",
                      border: "1px solid #198754",
                      lineHeight: "40px",
                      padding: 0,
                    }}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "1px solid #198754",
                    lineHeight: "40px",
                    padding: 0,
                }}>
                    &gt;
            </button>
        </div>
      )} */}

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
              color: startPage === 1 ? "#0084da" : "white",
              border: "1px solid #0084da",
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
                  backgroundColor: currentPage === page ? "#0084da" : "#fff",
                  color: currentPage === page ? "#fff" : "#0084da",
                  border: "1px solid #0084da",
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
              border: "1px solid #0084da",
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