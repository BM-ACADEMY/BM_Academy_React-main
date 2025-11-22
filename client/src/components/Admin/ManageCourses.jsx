import React, { useEffect, useState } from "react";
import API from "../../api";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("courses/");
      setCourses(res.data);
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
      if (editingCourse) {
        await API.put(`courses/${editingCourse.id}/`, formData);
      } else {
        await API.post("courses/", formData);
      }
      fetchCourses();
      closeModal();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`courses/${id}/`);
        fetchCourses();
      } catch (err) {
        console.error(err.response?.data);
      }
    }
  };

  // Open modal for Add/Edit
  const openModal = (course = null) => {
    setEditingCourse(course);
    setFormData(course ? { title: course.title, description: course.description } : { title: "", description: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingCourse(null);
    setFormData({ title: "", description: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Courses</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800 font-medium">{course.title}</td>
                  <td className="px-6 py-4 text-gray-600">{course.description}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openModal(course)}
                      className="mx-2 text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
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
                  No courses found.
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
              {editingCourse ? "Edit Course" : "Add Course"}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-3"
                rows="3"
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
                  {editingCourse ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
