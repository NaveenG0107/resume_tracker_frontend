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



import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard" },
    { key: "candidates", label: "Candidates", path: "/candidates" },
    { key: "candidateFilter", label: "Candidate Filter", path: "/candidate-filter" }
  ];

  return (
    <div
      style={{
        width: "240px",
        minWidth: "240px",
        flexShrink: 0,
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
        {/* Menu */}
        <div style={{ padding: "14px 10px" }}>
          {menu.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              style={({ isActive }) => ({
                cursor: "pointer",
                display: "block",
                padding: "12px 16px",
                width: "100%",
                borderRadius: "12px",
                marginBottom: "8px",
                backgroundColor: isActive ? "#0084da" : "transparent",
                color: isActive ? "#fff" : "#0084da",
                fontWeight: isActive ? "600" : "500",
                transition: "all 0.25s ease",
                textDecoration: "none"
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;