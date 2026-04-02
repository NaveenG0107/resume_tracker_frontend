import { Bell, Settings, FileText } from "lucide-react";

function HeaderNavbar() {
  return (
    <div
      style={{
        height: "70px",
        width: "100%",
        backgroundColor: "#c5d9e7",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
      }}
    >
      {/* Left Side - Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FileText size={22} color="#0d0d0e" />
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
            Resume Tracker
          </h5>
          <small style={{ color: "#6b7280" }}>Manage candidate resumes</small>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}
      >
        {/* Notification */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative"
          }}
        >
          <Bell size={18} color="#0d0d0e" />
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "8px",
              height: "8px",
              backgroundColor: "#22c55e",
              borderRadius: "50%"
            }}
          />
        </div>

        {/* Settings */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <Settings size={18} color="#0d0d0e" />
        </div>

        {/* Profile */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "#48a6ee",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          U
        </div>
      </div>
    </div>
  );
}

export default HeaderNavbar;