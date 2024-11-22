import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTrip } from "../../contexts/TripContext";
import "../../styles/Auth.css";

export default function Login() {
  const { login, error, dispatch } = useAuth();
  const { dispatch: tripDispatch } = useTrip();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSuccessfulLogin() {
    const guestTripData = localStorage.getItem("guestTripData");
    if (guestTripData) {
      const tripData = JSON.parse(guestTripData);

      tripDispatch({
        type: "SET_TRIP_DETAILS",
        payload: {
          destination: tripData.destination,
          startDate: new Date(tripData.dates[0]),
          endDate: new Date(tripData.dates[tripData.dates.length - 1]),
          mapCenter: tripData.mapCenter,
        },
      });

      if (tripData.markers) {
        tripDispatch({
          type: "SET_MARKERS",
          payload: tripData.markers,
        });
      }

      tripDispatch({
        type: "SET_ACTIVITIES",
        payload: tripData.activities,
      });

      localStorage.removeItem("guestTripData");

      navigate("/itinerary");
    } else {
      navigate("/");
    }
  }

  // ******************************************************

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch({ type: "SET_ERROR", payload: null });
      await login(email, password);
      await handleSuccessfulLogin();
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Invalid email or password" });
    }
  }

  // ******************************************************
  // ******************************************************

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <p className="auth-redirect">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
