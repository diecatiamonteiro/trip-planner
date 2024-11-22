import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import "../../styles/Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">
        <MdOutlineModeOfTravel className="nav-logo-icon" />

        <p>
          TRIP <br /> PLANNER
        </p>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/planning">Planning</NavLink>
        <NavLink to="/itinerary">Itinerary</NavLink>
      </div>

      <div className="nav-auth">
        {currentUser ? (
          <div className="user-menu">
            <NavLink to="/my-trips" className="nav-button my-trips-btn">
              My Trips
            </NavLink>
            <NavLink to="/dashboard" className="nav-button profile-btn  ">
              <FaRegUser /> Profile
            </NavLink>
            <button onClick={logout} className="nav-button logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <NavLink to="/login" className="nav-button login-btn">
              <button>Login</button>
            </NavLink>
            <NavLink to="/signup" className="nav-button signup-btn">
              <button>Sign Up</button>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
