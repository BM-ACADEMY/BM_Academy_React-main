import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaImage,
  FaLayerGroup,
  FaListAlt,
  FaBook,
  FaLaptop
} from "react-icons/fa";

import { useAuthFetch } from "../../utils/authFetch";
import Categories from "./Categories";
import SubCategories from "./SubCategories";

const BASE = import.meta.env.VITE_BASE_URI.replace(/\/$/, "");
const COURSE_API = `${BASE}/courses/`;
const SUB_CATEGORY_API = `${BASE}/sub-categories/`;

export default function Courses() {
  const authFetch = useAuthFetch();

  const [activeView, setActiveView] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [subCategoryId, setSubCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState([]);
  const [modules, setModules] = useState([""]);

  /* ---------------- FETCH ---------------- */
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await authFetch(COURSE_API);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await authFetch(SUB_CATEGORY_API);
      const data = await res.json();
      setSubCategories(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load sub categories");
    }
  };

  useEffect(() => {
    if (activeView === 'courses') {
        fetchCourses();
        fetchSubCategories();
    }
  }, [activeView]);

  /* ---------------- HELPERS ---------------- */
  const usedSubCategoryIds = courses
    .map((c) => c.sub_category?.id)
    .filter(Boolean);

  const toggleMode = (value) => {
    setMode((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const addModule = () => setModules((prev) => [...prev, ""]);

  const removeModule = (index) => setModules((prev) => prev.filter((_, i) => i !== index));

  const updateModule = (index, value) => {
    setModules((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const resetForm = () => {
    setSubCategoryId("");
    setTitle("");
    setDescription("");
    setDuration("");
    setMode([]);
    setModules([""]);
    setImage(null);
    setEditingId(null);
  };

  /* ---------------- SUBMIT (FIXED) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subCategoryId || !title || !duration || mode.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    // Safety Check: Allow duplicate sub-category ONLY if editing the same course
    const existing = courses.find((c) => c.sub_category?.id === subCategoryId);
    if (existing && existing.id !== editingId) {
        toast.error("This sub-category already has a course assigned.");
        return;
    }

    try {
      setSaving(true);
      const formData = new FormData();

      // ✅ FIX: Use 'sub_category' key (Backend expects this, not sub_category_id)
      formData.append("sub_category", subCategoryId);

      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("duration", duration.trim());

      mode.forEach((m) => formData.append("mode", m));

      // Handle Modules
      modules
        .map((m) => typeof m === 'string' ? m.trim() : "")
        .filter(Boolean)
        .forEach((m) => formData.append("modules[]", m));

      if (image) formData.append("image", image);

      const url = editingId ? `${COURSE_API}${editingId}/` : COURSE_API;
      // ✅ Use PUT for full update (matches your backend logs)
      const method = editingId ? "PUT" : "POST";

      const res = await authFetch(url, {
        method: method,
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Backend Error:", errData); // Check console for details
        throw errData;
      }

      toast.success(editingId ? "Course updated" : "Course created");
      resetForm();
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      // Show specific backend error if available
      const msg = err?.sub_category?.[0] || err?.detail || "Operation failed";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- EDIT (ROBUST) ---------------- */
  const handleEdit = (c) => {
    setEditingId(c.id);

    // ✅ Extract ID safely (handles both Object and String)
    const scId = c.sub_category?.id || c.sub_category || "";
    setSubCategoryId(scId);

    setTitle(c.title || "");
    setDescription(c.description || "");
    setDuration(c.duration || "");
    setMode(c.mode || []);

    // ✅ Convert Modules to simple strings (prevents [object Object] error)
    let safeModules = [""];
    if (Array.isArray(c.modules) && c.modules.length > 0) {
        safeModules = c.modules.map(m => {
            if (typeof m === 'object' && m !== null) {
                return m.title || m.name || JSON.stringify(m);
            }
            return m;
        });
    }
    setModules(safeModules);

    setImage(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      const res = await authFetch(`${COURSE_API}${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Course deleted");
      fetchCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8 min-h-screen bg-gray-50 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- TOP NAVIGATION TABS --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 pt-4">
        <div className="flex gap-8">
            {[
                { id: "categories", label: "1. Categories", icon: FaLayerGroup },
                { id: "subcategories", label: "2. Sub-Categories", icon: FaListAlt },
                { id: "courses", label: "3. Courses", icon: FaBook }
            ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`pb-4 text-sm font-bold uppercase tracking-wide transition-all border-b-4 flex items-center gap-2 ${
                activeView === tab.id
                ? "border-[#FFEA00] text-black"
                : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
            >
                <tab.icon className={activeView === tab.id ? "text-black" : "text-gray-300"} />
                {tab.label}
            </button>
            ))}
        </div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="px-6 pt-6">

        {/* VIEW 1: CATEGORIES */}
        {activeView === "categories" && <Categories />}

        {/* VIEW 2: SUB-CATEGORIES */}
        {activeView === "subcategories" && <SubCategories />}

        {/* VIEW 3: COURSES */}
        {activeView === "courses" && (
            <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Course Management</h2>
                        <p className="text-gray-500 text-sm mt-1">Create final courses under your sub-categories.</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-200"
                    >
                        <FaPlus size={12} /> Create Course
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Course Title</th>
                            <th className="px-6 py-4">Path</th>
                            <th className="px-6 py-4">Mode</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan="5" className="text-center py-10 text-gray-400">Loading courses...</td></tr>
                        ) : courses.length === 0 ? (
                            <tr><td colSpan="5" className="text-center py-10 text-gray-400">No courses found. Create one above.</td></tr>
                        ) : (
                            courses.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4 font-bold text-gray-900">{c.title}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="text-xs font-bold text-gray-400 uppercase mr-1">{c.category?.name || "N/A"}</span>
                                    <span className="text-gray-300 mx-1">/</span>
                                    {c.sub_category?.name || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                        {Array.isArray(c.mode) && c.mode.map(m => (
                                            <span key={m} className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                                                m === 'Online' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                                <FaLaptop size={8} /> {m}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{c.duration}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(c)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors" title="Edit"><FaEdit /></button>
                                        <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete"><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {activeView === "courses" && showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-8 py-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">{editingId ? "Edit Course" : "Create Course"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors"><FaTimes size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Program (Sub-Category)</label>
                    <select
                        value={subCategoryId}
                        onChange={(e) => setSubCategoryId(e.target.value)}
                        className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    >
                        <option value="">-- Choose Sub-Category --</option>
                        {subCategories.map((s) => {
                            // Only disable if already used by ANOTHER course (not current one)
                            const used = usedSubCategoryIds.includes(s.id) &&
                                (!editingId || courses.find((c) => c.id === editingId)?.sub_category?.id !== s.id);

                            return (
                                <option key={s.id} value={s.id} disabled={used}>
                                    {s.category_name} / {s.name} {used ? "(Linked)" : ""}
                                </option>
                            );
                        })}
                    </select>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Course Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Duration</label>
                    <input value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mode</label>
                    <div className="flex gap-2 h-[46px]">
                        {["Online", "Offline"].map((m) => (
                        <button type="button" key={m} onClick={() => toggleMode(m)} className={`flex-1 rounded-lg text-sm font-bold border transition-all ${mode.includes(m) ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>{m}</button>
                        ))}
                    </div>
                  </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none" />
              </div>

              <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center"><label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Syllabus Modules</label><button type="button" onClick={addModule} className="text-xs font-bold text-blue-600 hover:underline">+ Add Module</button></div>
                {modules.map((m, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-gray-400 w-6 text-center">{index + 1}</span>
                    <input value={m} onChange={(e) => updateModule(index, e.target.value)} className="flex-1 border border-gray-200 p-2 rounded focus:border-black outline-none text-sm" placeholder="Module Title" />
                    {modules.length > 1 && <button type="button" onClick={() => removeModule(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><FaTimes size={12} /></button>}
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Cover Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer relative bg-gray-50">
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <FaImage className="mx-auto text-gray-300 mb-2" size={24} />
                    <p className="text-sm text-gray-500 font-medium">{image ? image.name : "Click to upload course thumbnail"}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="bg-[#FFEA00] text-black px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-100">{saving ? "Saving..." : "Save Course"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
