import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../services/api";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 10,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    action: null,
    userId: null,
    userName: null,
  });

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${currentPage}&limit=10`);
      if (response.data.success) {
        setUsers(response.data.users);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      showError(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action, userId, userName) => {
    setModalState({
      isOpen: true,
      action,
      userId,
      userName,
    });
  };

  const handleConfirmAction = async () => {
    const { action, userId } = modalState;
    try {
      const endpoint =
        action === "activate" ? `/admin/users/${userId}/activate` : `/admin/users/${userId}/deactivate`;
      const response = await api.put(endpoint);
      if (response.data.success) {
        showSuccess(response.data.message);
        fetchUsers();
        setModalState({ isOpen: false, action: null, userId: null, userName: null });
      }
    } catch (error) {
      showError(error.response?.data?.message || `Failed to ${action} user`);
      setModalState({ isOpen: false, action: null, userId: null, userName: null });
    }
  };

  const handleCancelAction = () => {
    setModalState({ isOpen: false, action: null, userId: null, userName: null });
  };

  const getStatusBadgeClass = (status) => {
    return status === "active" ? "status-active" : "status-inactive";
  };

  const getRoleBadgeClass = (role) => {
    return role === "admin" ? "role-admin" : "role-user";
  };

  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p className="admin-subtitle">Manage users and their accounts</p>
        </div>

        {loading ? (
          <Loading fullScreen />
        ) : (
          <>
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{pagination.totalUsers}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Current Page</div>
                <div className="stat-value">
                  {pagination.currentPage} / {pagination.totalPages}
                </div>
              </div>
            </div>

            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.email}</td>
                        <td>{u.fullName}</td>
                        <td>
                          <span className={`badge ${getRoleBadgeClass(u.role)}`}>{u.role}</span>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(u.status)}`}>{u.status}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {u.status === "inactive" ? (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleActionClick("activate", u._id, u.fullName)}
                                disabled={u._id === user?._id}
                              >
                                Activate
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleActionClick("deactivate", u._id, u.fullName)}
                                disabled={u._id === user?._id}
                              >
                                Deactivate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            <Modal
              isOpen={modalState.isOpen}
              onClose={handleCancelAction}
              title={`${modalState.action === "activate" ? "Activate" : "Deactivate"} User`}
              onConfirm={handleConfirmAction}
              confirmText={modalState.action === "activate" ? "Activate" : "Deactivate"}
            >
              <p>
                Are you sure you want to {modalState.action} the user{" "}
                <strong>{modalState.userName}</strong>?
              </p>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}