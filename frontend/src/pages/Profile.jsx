import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../services/api";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      if (response.data.success) {
        const userData = response.data.user;
        setFormData({
          fullName: userData.fullName,
          email: userData.email,
        });
        updateUser(userData);
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
    });
    setErrors({});
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.put("/user/profile", formData);
      if (response.data.success) {
        updateUser(response.data.user);
        setIsEditing(false);
        showSuccess("Profile updated successfully!");
      }
    } catch (error) {
      showError(error.response?.data?.message || error.response?.data?.errors?.[0] || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!validatePassword(passwordData.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.put("/user/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.data.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsChangingPassword(false);
        showSuccess("Password changed successfully!");
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-card">
          <h1>My Profile</h1>

          {/* Profile Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Profile Information</h2>
              {!isEditing && (
                <button className="btn btn-primary" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{user?.fullName}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="info-item">
                  <label>Role</label>
                  <p className={`role-badge role-${user?.role}`}>{user?.role}</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <p className={`status-badge status-${user?.status}`}>{user?.status}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={errors.fullName ? "input-error" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? "input-error" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <Loading size="small" /> : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Change Password */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Change Password</h2>
              {!isChangingPassword && (
                <button className="btn btn-primary" onClick={() => setIsChangingPassword(true)}>
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword && (
              <form onSubmit={handlePasswordSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className={errors.currentPassword ? "input-error" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className={errors.newPassword ? "input-error" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                  <small className="form-hint">
                    Must be at least 8 characters with uppercase, lowercase, and number
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className={errors.confirmPassword ? "input-error" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setErrors({});
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? <Loading size="small" /> : "Change Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}