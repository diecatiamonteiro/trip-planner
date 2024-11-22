import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useTrip } from "../contexts/TripContext";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatDateForDisplay, formatDateShort } from "../utils/formatDates";
import ActivityForm from "../components/activity/ActivityForm";
import ActivityList from "../components/activity/ActivityList";
import Map from "../components/layout/Map";
import { saveTrip } from "../utils/firestoreUtils";
import { useAuth } from "../contexts/AuthContext";
import "../styles/PlanningPage.css";
import "../styles/ActivityForm.css";

export default function PlanningPage() {
  const { state } = useTrip();
  const { currentUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const { date } = useParams(); // get date from url parameter
  const navigate = useNavigate();

  // ******************************************************

  const activeDate = date || state.dates[0]?.toISOString() || null;

  // If no valid date is selected, show the no-plan-message
  if (!activeDate) {
    return (
      <div className="planning-container">
        <div className="no-plan-message">
          <p>
            No valid date selected. <br /> Please start a new trip planning.
          </p>
          <Link to="/">
            <button>Start Planning</button>
          </Link>
        </div>
      </div>
    );
  }

  // ******************************************************

  const handleUpdateTrip = async () => {
    if (!currentUser) {
      alert("Please login to save your itinerary");
      // Store current trip data in localStorage before redirecting
      const guestTripData = {
        destination: state.destination,
        dates: state.dates,
        activities: state.activities,
        totalDays: state.totalDays,
        mapCenter: state.mapCenter,
        markers: state.markers,
      };
      localStorage.setItem("guestTripData", JSON.stringify(guestTripData));
      navigate("/login");
      return;
    }

    if (!state.tripId) return;

    try {
      setIsSaving(true);
      const tripData = {
        destination: state.destination,
        dates: state.dates,
        activities: state.activities,
        totalDays: state.totalDays,
        mapCenter: state.mapCenter,
        markers: state.markers,
      };

      await saveTrip(currentUser.uid, tripData, state.tripId);
      alert("Trip updated successfully!");
    } catch (error) {
      console.error("Error updating trip:", error);
      alert("Failed to update trip");
    } finally {
      setIsSaving(false);
    }
  };

  // ******************************************************
  // ******************************************************

  return (
    <div className="planning-container">
      <aside className="days-sidebar">
        <h2>Overview</h2>
        <h3>
          {state.totalDays ? `${state.totalDays} Days` : "No days selected"}
        </h3>
        <ul>
          {state.dates.map((day) => (
            <li
              key={day.toString()}
              className={activeDate === day.toISOString() ? "selected" : ""}
            >
              <Link
                to={`/planning/${day.toISOString()}`}
                style={{ display: "block", width: "100%", height: "100%" }}
              >
                {formatDateShort(day)}
              </Link>
            </li>
          ))}
        </ul>
        {state.tripId && (
          <button
            onClick={handleUpdateTrip}
            disabled={isSaving}
            className="update-trip-button"
          >
            {isSaving ? "Updating..." : "Update Trip"}
          </button>
        )}
        <Link to={`/itinerary`}>
          <button className="manage-trip-button">See Trip Details</button>
        </Link>
        <Link to={`/`}>
          <button className="start-new-plan-button">Plan New Trip</button>
        </Link>
      </aside>

      <main className="activities-section">
        <h2>Trip to {capitalizeFirstLetter(state.destination)}</h2>
        {activeDate ? (
          <div className="selected-date-activities">
            <h3>
              Plans for {""}
              <span>{formatDateForDisplay(activeDate)}</span>
            </h3>
            <ActivityForm date={activeDate} />
            <ActivityList date={activeDate} />
          </div>
        ) : (
          <>
            <p>Select a place and dates to start planning.</p>
            <Link to="/">
              <button>Set place and dates</button>
            </Link>
          </>
        )}
      </main>

      <aside className="map-section">
        <Map />
      </aside>
    </div>
  );
}
