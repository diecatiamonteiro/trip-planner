import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlanningPage from "./pages/PlanningPage";
import ItineraryPage from "./pages/ItineraryPage";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SavedTripsPage from "./pages/SavedTripsPage";
import TripProvider from "./contexts/TripContext";
import UserDashboard from "./components/auth/UserDashboard";

export default function Routing() {
  return (
    <TripProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/planning/:date" element={<PlanningPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-trips"
              element={
                <ProtectedRoute>
                  <SavedTripsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </TripProvider>
  );
}
