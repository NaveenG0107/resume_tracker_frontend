import { useState } from "react";

const dummyData = [
  {
    candidate_id: "1",
    name: "John Doe",
    email_address: "john@mail.com",
    phone_number: "9876543210",
    location: "Chennai",
    total_experience: 3,
    is_active: true,
    skills: ["Python", "Django"],
    education: ["B.Tech"],
    company: ["TCS"],
    role: ["Developer"]
  },
  {
    candidate_id: "2",
    name: "Sam Wilson",
    email_address: "sam@mail.com",
    phone_number: "9123456780",
    location: "Bangalore",
    total_experience: 5,
    is_active: true,
    skills: ["React", "Node.js"],
    education: ["MCA"],
    company: ["Infosys"],
    role: ["Senior Dev"]
  },
  {
    candidate_id: "3",
    name: "Alex Kumar",
    email_address: "alex@mail.com",
    phone_number: "9000000000",
    location: "Hyderabad",
    total_experience: 2,
    is_active: false,
    skills: ["Java"],
    education: ["B.Tech"],
    company: ["HCL"],
    role: ["Junior Dev"]
  }
];

function Candidates() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");

  // 🔄 Column sorting (optional UI)
  const handleSort = (field) => {
    setSortField(field);
  };

  const getArrow = (field) => {
    return sortField === field ? "↑" : "↕";
  };

  // 🔍 Filter + simple sort (only for UI preview)
  const processed = [...dummyData]
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;

      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        return valA.localeCompare(valB);
      } else {
        return valA - valB;
      }
    });

  return (
    <div className="card p-4">
      <h3 className="mb-3">Candidates</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="form-select w-auto"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="total_experience">Experience</option>
          <option value="location">Location</option>
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                Name {getArrow("name")}
              </th>
              <th onClick={() => handleSort("email_address")} style={{ cursor: "pointer" }}>
                Email {getArrow("email_address")}
              </th>
              <th>Phone</th>
              <th onClick={() => handleSort("location")} style={{ cursor: "pointer" }}>
                Location {getArrow("location")}
              </th>
              <th onClick={() => handleSort("total_experience")} style={{ cursor: "pointer" }}>
                Exp {getArrow("total_experience")}
              </th>
              <th>Skills</th>
              <th>Education</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {processed.map((c) => (
              <tr key={c.candidate_id}>
                
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-success text-white rounded-circle me-2 d-flex align-items-center justify-content-center"
                      style={{ width: 35, height: 35 }}
                    >
                      {c.name[0]}
                    </div>
                    {c.name}
                  </div>
                </td>

                <td>{c.email_address}</td>
                <td>{c.phone_number}</td>
                <td>{c.location}</td>
                <td>{c.total_experience} yrs</td>

                <td>
                  {c.skills.map((s, i) => (
                    <span key={i} className="badge bg-success me-1">
                      {s}
                    </span>
                  ))}
                </td>

                <td>
                  {c.education.map((e, i) => (
                    <div key={i}>{e}</div>
                  ))}
                </td>

                <td>
                  {c.company.map((comp, i) => (
                    <div key={i}>{comp}</div>
                  ))}
                </td>

                <td>
                  {c.role.map((r, i) => (
                    <div key={i}>{r}</div>
                  ))}
                </td>

                <td>
                  {c.is_active ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;