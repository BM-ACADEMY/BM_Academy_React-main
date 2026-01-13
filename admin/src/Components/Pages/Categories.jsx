import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
  FaSearch
} from "react-icons/fa";
import { useAuthFetch } from "../../utils/authFetch";

const Categories = () => {
  const authFetch = useAuthFetch();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const apiUrl = `${import.meta.env.VITE_BASE_URI}categories/`;

  /* ---------------- FETCH ---------------- */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await authFetch(apiUrl);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- HELPERS ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  const openModal = (cat = null) => {
    if (cat) {
      setEditingId(cat.id);
      setName(cat.name);
      setPreview(cat.image || null);
      setImageFile(null);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setSaving(true);

      const res = await authFetch(
        editingId ? `${apiUrl}${editingId}/` : apiUrl,
        {
          method: editingId ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.name?.[0] || "Operation failed");
      }

      toast.success(editingId ? "Category updated" : "Category added");
      closeModal();
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category? This might affect related courses.")) return;

    try {
      const res = await authFetch(`${apiUrl}${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }

      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8 min-h-screen bg-gray-50 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6 px-1">
        <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Category Management</h2>
            <p className="text-gray-500 text-sm mt-1">Organize Your Courses Into Broad Topics.</p>
        </div>

        <button
          onClick={() => openModal()}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-200"
        >
          <FaPlus size={12} /> Add Category
        </button>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4 w-full">Category Name</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="3" className="text-center py-10 text-gray-400">Loading categories...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan="3" className="text-center py-10 text-gray-400">No categories found. Create one above.</td></tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        ) : (
                          <FaImage className="text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-bold text-gray-800 text-base">{cat.name}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal(cat)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? "Edit Category" : "Add New Category"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Development"
                  className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                  autoFocus
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Cover Image</label>

                {/* Preview Area */}
                {preview && (
                  <div className="relative h-40 w-full mb-3 rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setPreview(null); setImageFile(null); }}
                      className="absolute top-2 right-2 bg-white/90 text-red-600 p-1.5 rounded shadow-sm hover:bg-white transition-colors"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                )}

                {!preview && (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer relative bg-gray-50 hover:bg-gray-100">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <FaImage className="mx-auto text-gray-300 mb-2" size={24} />
                    <p className="text-sm text-gray-500 font-medium">Click to upload image</p>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#FFEA00] text-black px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-100"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
