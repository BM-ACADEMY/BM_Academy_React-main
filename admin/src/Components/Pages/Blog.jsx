import React, { useState, useEffect } from "react";
import { useAuthFetch } from "../../utils/authFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Icons matching your Courses design
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaImage,
  FaLayerGroup,
  FaNewspaper,
  FaTags,
  FaUser,
  FaClock
} from "react-icons/fa";

// ✅ Using your specific Blog Admin API URL
const apiUrl = `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/blogs/admin/`;

// ✅ SAFE DISPLAY HELPER
const toText = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return "-";
};

export default function BlogTableLayout() {
  const authFetch = useAuthFetch();

  // --- STATE ---
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- FORM STATE ---
  // Existing fields
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");

  // New UI fields (to match Courses density)
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("General");
  const [readTime, setReadTime] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // Image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Accordion State
  const [activeSection, setActiveSection] = useState("basic");

  // ------------------ FETCH ------------------
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await authFetch(apiUrl);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ------------------ RESET ------------------
  const resetForm = () => {
    setTitle("");
    setShortDescription("");
    setContent("");
    setStatus("draft");
    setAuthor("");
    setCategory("General");
    setReadTime("");
    setTags([]);
    setNewTag("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setActiveSection("basic");
  };

  const openModal = (blog = null) => {
    if (blog) {
      // Edit Mode
      setEditingId(blog.id);
      setTitle(blog.title);
      setShortDescription(blog.short_description || "");
      setContent(blog.content || "");
      setStatus(blog.status || "draft");
      setImagePreview(blog.thumbnail || null);

      // Map extra fields if they exist in your DB, otherwise defaults
      setAuthor(blog.author || "");
      setCategory(blog.category || "General");
      setReadTime(blog.read_time || "");
      setTags(Array.isArray(blog.tags) ? blog.tags.map((t, i) => ({ id: i, name: t })) : []);
    } else {
      // Create Mode
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // ------------------ HANDLERS ------------------
  const addTag = (e) => {
    e?.preventDefault();
    if (!newTag.trim()) return;
    setTags([...tags, { id: Date.now(), name: newTag.trim() }]);
    setNewTag("");
  };

  const removeTag = (id) =>
    setTags(tags.filter((t) => t.id !== id));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("short_description", shortDescription);
      formData.append("content", content);
      formData.append("status", status);

      // Optional: Add these to backend if supported, otherwise they are just UI state
      formData.append("author", author);
      formData.append("category", category);
      formData.append("read_time", readTime);
      tags.forEach((t) => formData.append("tags", t.name));

      // Use 'thumbnail' as per your original code
      if (imageFile) formData.append("thumbnail", imageFile);

      const url = editingId ? `${apiUrl}${editingId}/` : apiUrl;
      const method = editingId ? "PUT" : "POST";

      const res = await authFetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Save failed");

      // Success Notification
      toast.success(editingId ? "Blog updated successfully!" : "Blog created!");

      closeModal();
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Error saving blog. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    try {
      await authFetch(`${apiUrl}${blog.id}/`, { method: "DELETE" });
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  // --- STYLES HELPER ---
  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors outline-none";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";

  // ------------------ UI ------------------
  return (
    <div className="space-y-6 relative">

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Blog Management</h2>
          <p className="text-slate-500 text-sm mt-1">Create and manage your articles and news updates.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition flex items-center gap-2"
        >
          <FaPlus size={14} />
          <span>Add Blog</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Article Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Author / Category</th>
                <th className="px-6 py-4">Tags / Read Time</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading data...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">No blogs found.</td></tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center text-slate-300">
                          {blog.thumbnail ? (
                            <img src={blog.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <FaNewspaper size={20} />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-base line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-slate-500 truncate max-w-[200px]">{blog.short_description || "No description"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        blog.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {blog.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                        <div className="flex flex-col">
                            <span className="text-slate-800 flex items-center gap-1"><FaUser className="text-xs text-slate-400"/> {blog.author || "Admin"}</span>
                            <span className="text-xs text-slate-500 font-normal mt-0.5">{blog.category || "General"}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {toText(blog.tags || ["-"])}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-500">
                             <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                             {blog.read_time || "5 min read"}
                          </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={() => openModal(blog)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => handleDelete(blog)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
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
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Blog Details" : "Create New Blog"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-100 rounded-full">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-6 space-y-4 flex-1 bg-slate-50/50">
              <form id="blogForm" onSubmit={handleSubmit} className="space-y-4">

                {/* 1. Basic Content Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'basic' ? '' : 'basic')}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm"
                   >
                     <span className="flex items-center gap-2"><FaNewspaper className="text-blue-500"/> Content Information</span>
                     {activeSection === 'basic' ? <FaChevronUp /> : <FaChevronDown />}
                   </button>

                   {activeSection === 'basic' && (
                     <div className="p-4 pt-0 border-t border-slate-100 space-y-4 mt-2">
                       <div>
                         <label className={labelClass}>Blog Title</label>
                         <input required value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="e.g. The Future of Web Dev" />
                       </div>
                       <div>
                         <label className={labelClass}>Short Description</label>
                         <textarea rows="2" value={shortDescription} onChange={e => setShortDescription(e.target.value)} className={inputClass} placeholder="Brief summary for preview cards..." />
                       </div>
                       <div>
                         <label className={labelClass}>Full Content</label>
                         <textarea rows="5" value={content} onChange={e => setContent(e.target.value)} className={inputClass} placeholder="Write your full article here..." />
                       </div>

                       {/* Image Upload */}
                       <div>
                          <label className={labelClass}>Thumbnail Image</label>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="w-20 h-20 bg-slate-100 rounded-lg border border-slate-200 border-dashed flex items-center justify-center overflow-hidden">
                              {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <FaImage className="text-slate-300" size={24} />}
                            </div>
                            <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                                Upload Thumbnail
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                          </div>
                       </div>
                     </div>
                   )}
                </div>

                {/* 2. Meta & Settings Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'settings' ? '' : 'settings')}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm"
                   >
                     <span className="flex items-center gap-2"><FaUser className="text-purple-500"/> Meta & Settings</span>
                     {activeSection === 'settings' ? <FaChevronUp /> : <FaChevronDown />}
                   </button>

                   {activeSection === 'settings' && (
                     <div className="p-4 pt-0 border-t border-slate-100 space-y-4 mt-2">
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className={labelClass}>Author Name</label>
                            <input value={author} onChange={e => setAuthor(e.target.value)} className={inputClass} placeholder="e.g. Admin" />
                         </div>
                         <div>
                            <label className={labelClass}>Category</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
                              <option value="General">General</option>
                              <option value="Technology">Technology</option>
                              <option value="Design">Design</option>
                              <option value="Business">Business</option>
                            </select>
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className={labelClass}>Read Time</label>
                            <input value={readTime} onChange={e => setReadTime(e.target.value)} className={inputClass} placeholder="e.g. 5 min read" />
                         </div>
                         <div>
                            <label className={labelClass}>Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} className={inputClass}>
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                            </select>
                         </div>
                       </div>
                     </div>
                   )}
                </div>

                {/* 3. Tags Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'tags' ? '' : 'tags')}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm"
                   >
                     <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2"><FaTags className="text-emerald-500"/> Tags</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">{tags.length}</span>
                     </div>
                     {activeSection === 'tags' ? <FaChevronUp /> : <FaChevronDown />}
                   </button>

                   {activeSection === 'tags' && (
                     <div className="p-4 pt-0 border-t border-slate-100 space-y-4 mt-2">
                        <div className="flex gap-2">
                          <input
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addTag(e)}
                            placeholder="Type tag name..."
                            className={inputClass}
                          />
                          <button type="button" onClick={addTag} className="bg-slate-800 hover:bg-black text-white px-4 rounded-lg font-medium transition-colors">Add</button>
                        </div>

                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                          {tags.map((t) => (
                              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                                <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                  <FaTags className="text-slate-400 text-xs"/> {t.name}
                                </span>
                                <button type="button" onClick={() => removeTag(t.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                                    <FaTrash size={14}/>
                                </button>
                              </div>
                          ))}
                          {tags.length === 0 && <p className="text-xs text-slate-400 text-center py-2">No tags added yet.</p>}
                        </div>
                     </div>
                   )}
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
              <button onClick={closeModal} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors text-sm">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-blue-200 text-sm"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Blog"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
