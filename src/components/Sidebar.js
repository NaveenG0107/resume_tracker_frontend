// function Sidebar({ active, setActive }) {
//   const menu = [
//     { key: "dashboard", label: "Dashboard" },
//     { key: "candidates", label: "Candidates" },
//     { key: "candidateFilter", label: "Candidate Filter" }
//   ];

//   return (
//     <div
//       style={{
//         width: "220px",
//         minHeight: "100vh",
//         borderRight: "1px solid #ddd"
//       }}
//     >
//       {/* Title */}
//       <div style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
//         <h5 style={{ margin: 0 }}>Resume Tracker</h5>
//       </div>

//       {/* Menu */}
//       <div>
//         {menu.map((item) => (
//           <div
//             key={item.key}
//             onClick={() => setActive(item.key)}
//             style={{
//               cursor: "pointer",
//               padding: "12px 16px",
//               width: "100%",
//               backgroundColor:
//                 active === item.key ? "#198754" : "transparent",
//               color: active === item.key ? "#fff" : "#000"
//             }}
//           >
//             {item.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



function Sidebar({ active, setActive }) {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "candidates", label: "Candidates" },
    { key: "candidateFilter", label: "Candidate Filter" }
  ];

  return (
    <div
      style={{
        width: "240px",
        minHeight: "90vh",
        backgroundColor: "#e0eaf1",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* Top Section */}
      <div>
        {/* Title */}
        <div
          style={{
            padding: "20px 18px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#48a6ee",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            U
          </div>

          <div>
            <h5
              style={{
                margin: 0,
                color: "#111827",
                fontWeight: "700",
                fontSize: "18px"
              }}
            >
              username
            </h5>
            <small style={{ color: "#6b7280" }}>Dashboard Panel</small>
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: "14px 10px" }}>
          {menu.map((item) => {
            const isActive = active === item.key;

            return (
              <div
                key={item.key}
                onClick={() => setActive(item.key)}
                style={{
                  cursor: "pointer",
                  padding: "12px 16px",
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "8px",
                  backgroundColor: isActive ? "#0084da" : "transparent",
                  color: isActive ? "#fff" : "#0084da",
                  fontWeight: isActive ? "600" : "500",
                  transition: "all 0.25s ease",
                  border: isActive ? "none" : "1px solid transparent"
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#0084da20";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout at Bottom */}
      <div style={{ padding: "14px 10px" }}>
        <div
          style={{
            cursor: "pointer",
            padding: "12px 16px",
            width: "100%",
            borderRadius: "12px",
            backgroundColor: "#fff5f5",
            color: "#dc2626",
            fontWeight: "600",
            border: "1px solid #fecaca",
            transition: "all 0.25s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fee2e2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff5f5";
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;