import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">User Management</Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-user-info">
            <span className="user-name">{user.fullName}</span>
            <span className={`user-role role-${user.role}`}>{user.role}</span>
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              Profile
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            )}
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}