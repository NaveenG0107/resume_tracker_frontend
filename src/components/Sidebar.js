function Sidebar({ active, setActive }) {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "candidates", label: "Candidates" },
    { key: "candidateFilter", label: "Candidate Filter" }
  ];

  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        borderRight: "1px solid #ddd"
      }}
    >
      {/* Title */}
      <div style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <h5 style={{ margin: 0 }}>Resume Tracker</h5>
      </div>

      {/* Menu */}
      <div>
        {menu.map((item) => (
          <div
            key={item.key}
            onClick={() => setActive(item.key)}
            style={{
              cursor: "pointer",
              padding: "12px 16px",
              width: "100%",
              backgroundColor:
                active === item.key ? "#198754" : "transparent",
              color: active === item.key ? "#fff" : "#000"
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;