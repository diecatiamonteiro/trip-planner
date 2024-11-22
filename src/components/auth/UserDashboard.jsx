import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import "../../styles/Dashboard.css";

export default function UserDashboard() {
  const { currentUser, userData, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const navigate = useNavigate();

  // Reauthorize user with current password
  const reauthorize = async (currentPassword) => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(currentUser, credential);
  };

  // ******************************************************

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      // First reauthorize
      await reauthorize(currentPassword);

      // Then update password
      await updatePassword(currentUser, newPassword);

      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // ******************************************************

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        // Get current password for reauthorization
        const password = prompt(
          "Please enter your password to confirm deletion:"
        );
        if (!password) return;

        // Reauthorize
        await reauthorize(password);

        // Delete user
        await deleteUser(currentUser);
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // ******************************************************
  // ******************************************************

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Profile Settings</h1>
      </header>

      <div className="dashboard-content">
        <section className="user-info">
          <h2>Personal Information</h2>
          <div className="info-item">
            <label>Name:</label>
            <span>{userData?.firstName || "Not set"}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{currentUser?.email}</span>
          </div>
        </section>

        <section className="security-settings">
          <h2>Security Settings</h2>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <div className="password-section">
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="toggle-password-btn"
            >
              {isChangingPassword ? "Cancel" : "Change Password"}
            </button>

            {isChangingPassword && (
              <form onSubmit={handlePasswordChange} className="password-form">
                <div className="form-group">
                  <label>Current Password:</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="update-password-btn">
                  Update Password
                </button>
              </form>
            )}
          </div>

          <div className="delete-account-section">
            <button
              onClick={handleDeleteAccount}
              className="delete-account-btn"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
