import React, { useEffect, useState } from "react";
import API from "../../api";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("users/"); // your API endpoint
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add/Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await API.put(`users/${editingUser.id}/`, formData);
      } else {
        await API.post("users/", formData);
      }
      fetchUsers();
      closeModal();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`users/${id}/`);
        fetchUsers();
      } catch (err) {
        console.error(err.response?.data);
      }
    }
  };

  // Open modal
  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(user ? { username: user.username, email: user.email } : { username: "", email: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setFormData({ username: "", email: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800 font-medium">{user.username}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openModal(user)}
                      className="mx-2 text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="mx-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
