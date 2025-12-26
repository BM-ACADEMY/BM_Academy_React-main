// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { useAuthFetch } from "../../utils/authFetch";

// const apiUrl = `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/courses/`;

// export default function Courses() {
//   const authFetch = useAuthFetch();
//   const [courses, setCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [mode, setMode] = useState("Online");
//   const [duration, setDuration] = useState("Short-term");
//   const [enrolledStatus, setEnrolledStatus] = useState("Open");
//   const [progress, setProgress] = useState(0); // ✅ New progress field
//   const [modules, setModules] = useState([]);
//   const [newModule, setNewModule] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   // ------------------ Fetch Courses ------------------
//   const fetchCourses = async () => {
//     try {
//       setLoadingCourses(true);
//       const res = await authFetch(apiUrl);
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       alert("Error fetching courses! Check console.");
//     } finally {
//       setLoadingCourses(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // ------------------ Reset Form ------------------
//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setMode("Online");
//     setDuration("Short-term");
//     setEnrolledStatus("Open");
//     setProgress(0);
//     setModules([]);
//     setNewModule("");
//     setImageFile(null);
//     setImagePreview(null);
//     setEditingId(null);
//   };

//   // ------------------ Modules ------------------
//   const addModule = () => {
//     if (newModule.trim()) {
//       setModules([...modules, { id: Date.now().toString(), name: newModule.trim() }]);
//       setNewModule("");
//     }
//   };
//   const removeModule = (id) => setModules(modules.filter((m) => m.id !== id));
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(modules);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     setModules(reordered);
//   };

//   // ------------------ Submit Form ------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("mode", mode);
//       formData.append("duration", duration);
//       formData.append("enrolled_status", enrolledStatus);
//       formData.append("progress", progress); // ✅ Include progress
//       if (imageFile) formData.append("image", imageFile);
//       modules.forEach((m) => formData.append("modules", m.name));

//       const url = editingId ? `${apiUrl}${editingId}/` : apiUrl;
//       const method = editingId ? "PUT" : "POST";

//       const res = await authFetch(url, { method, body: formData });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.detail || "Failed to save course");
//       }

//       alert(editingId ? "Course updated successfully!" : "Course added successfully!");
//       resetForm();
//       fetchCourses();
//     } catch (err) {
//       console.error("Error saving course:", err);
//       alert("Error saving course! Check console.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ------------------ Edit & Delete ------------------
//   const handleEdit = (course) => {
//     const id = course._id?.$oid || course.id;
//     setEditingId(id);
//     setTitle(course.title);
//     setDescription(course.description);
//     setPrice(course.price);
//     setMode(course.mode);
//     setDuration(course.duration);
//     setEnrolledStatus(course.enrolled_status);
//     setProgress(course.progress || 0); // ✅ Load progress
//     setModules((course.modules || []).map((m, i) => ({ id: `${i}-${m}`, name: m })));
//     setImagePreview(course.image_url || null);
//     setImageFile(null);
//   };

//   const handleDelete = async (course) => {
//     const id = course._id?.$oid || course.id;
//     if (!window.confirm("Are you sure you want to delete this course?")) return;
//     try {
//       const res = await authFetch(`${apiUrl}${id}/`, { method: "DELETE" });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.detail || "Failed to delete course");
//       }
//       alert("Course deleted successfully!");
//       fetchCourses();
//     } catch (err) {
//       console.error("Error deleting course:", err);
//       alert("Error deleting course! Check console.");
//     }
//   };

//   // ------------------ Render ------------------
//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">{editingId ? "Edit Course" : "Add Course"}</h1>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-lg rounded-lg p-6 mb-8">
//         <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="border p-2 rounded col-span-2" />
//         <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded col-span-2" rows={3} />
//         <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required className="border p-2 rounded" />
//         <select value={mode} onChange={(e) => setMode(e.target.value)} className="border p-2 rounded">
//           <option value="Online">Online</option>
//           <option value="Offline">Offline</option>
//         </select>
//         <select value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2 rounded">
//           <option value="Short-term">Short-term</option>
//           <option value="Long-term">Long-term</option>
//         </select>
//         <select value={enrolledStatus} onChange={(e) => setEnrolledStatus(e.target.value)} className="border p-2 rounded">
//           <option value="Open">Open</option>
//           <option value="Closed">Closed</option>
//           <option value="Ongoing">Ongoing</option>
//         </select>

//         {/* Progress input */}
//         <input
//           type="number"
//           min="0"
//           max="100"
//           value={progress}
//           onChange={(e) => setProgress(e.target.value)}
//           placeholder="Progress %"
//           className="border p-2 rounded"
//         />

//         {/* Image Upload */}
//         <div className="col-span-2">
//           <input type="file" onChange={(e) => {
//             const file = e.target.files[0];
//             setImageFile(file);
//             if (file) {
//               const reader = new FileReader();
//               reader.onloadend = () => setImagePreview(reader.result);
//               reader.readAsDataURL(file);
//             } else setImagePreview(null);
//           }} className="border p-2 rounded w-full" />
//           {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded shadow" />}
//         </div>

//         {/* Modules */}
//         <div className="col-span-2">
//           <div className="flex gap-2">
//             <input value={newModule} onChange={(e) => setNewModule(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addModule())}
//               onBlur={() => newModule.trim() && addModule()}
//               placeholder="Add module" className="border p-2 rounded flex-1" />
//             <button type="button" onClick={addModule} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">+</button>
//           </div>

//           <DragDropContext onDragEnd={handleDragEnd}>
//             <Droppable droppableId="modules">
//               {(provided) => (
//                 <div {...provided.droppableProps} ref={provided.innerRef} className="mt-3 flex flex-col gap-2">
//                   {modules.map((mod, i) => (
//                     <Draggable key={mod.id} draggableId={mod.id} index={i}>
//                       {(provided) => (
//                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-gray-100 px-3 py-2 rounded flex justify-between items-center shadow-sm">
//                           <span>{mod.name}</span>
//                           <button type="button" onClick={() => removeModule(mod.id)} className="text-red-500 font-bold hover:text-red-700">×</button>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </DragDropContext>
//         </div>

//         <button type="submit" disabled={saving} className={`col-span-2 ${saving ? "bg-gray-400" : "bg-green-600"} text-white py-2 rounded hover:bg-green-700 transition`}>
//           {saving ? "Saving..." : editingId ? "Update Course" : "Add Course"}
//         </button>
//       </form>

//       <h2 className="text-2xl font-bold mb-4">Courses</h2>
//       {loadingCourses ? (
//         <p>Loading courses...</p>
//       ) : (
//         <ul className="space-y-4">
//           {courses.map((course) => {
//             const courseId = course._id?.$oid || course.id;
//             return (
//               <li key={courseId} className="bg-white shadow-md p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold">{course.title}</h3>
//                   <p className="text-sm text-gray-700">{course.description}</p>
//                   <p className="text-sm">Price: {course.price}</p>
//                   <p className="text-sm">Mode: {course.mode}</p>
//                   <p className="text-sm">Duration: {course.duration}</p>
//                   <p className="text-sm">Status: {course.enrolled_status}</p>
//                   <p className="text-sm">Modules: {(course.modules || []).join(", ")}</p>

//                   {/* ✅ Progress Bar */}
//                   <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
//                     <div
//                       className={`h-3 rounded-full ${course.progress >= 100 ? "bg-green-500" : "bg-blue-500"}`}
//                       style={{ width: `${course.progress || 0}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">{course.progress || 0}% completed</p>
//                 </div>

//                 {course.image_url && <img src={course.image_url} width="120" alt={course.title} className="mt-2 md:mt-0 rounded" />}
//                 <div className="mt-2 flex gap-2 md:mt-0">
//                   <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
//                   <button onClick={() => handleDelete(course)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAuthFetch } from "../../utils/authFetch";
// 1. Import Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Icons
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaGripVertical,
  FaImage,
  FaLayerGroup
} from "react-icons/fa";

const apiUrl = `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/courses/`;

// ✅ SAFE DISPLAY HELPER
const toText = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return "-";
};

export default function CoursesTableLayout() {
  const authFetch = useAuthFetch();

  // --- STATE ---
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState([]);
  const [duration, setDuration] = useState([]);
  const [enrolledStatus, setEnrolledStatus] = useState("Open");
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Accordion State
  const [activeSection, setActiveSection] = useState("basic");

  // ------------------ FETCH ------------------
  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const res = await authFetch(apiUrl);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ------------------ RESET ------------------
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setMode([]);
    setDuration([]);
    setEnrolledStatus("Open");
    setProgress(0);
    setModules([]);
    setNewModule("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setActiveSection("basic");
  };

  const openModal = (course = null) => {
    if (course) {
      // Edit Mode
      const id = course._id?.$oid || course.id;
      setEditingId(id);
      setTitle(course.title);
      setDescription(course.description);
      setPrice(course.price);
      setMode(Array.isArray(course.mode) ? course.mode : [course.mode]);
      setDuration(Array.isArray(course.duration) ? course.duration : [course.duration]);
      setEnrolledStatus(course.enrolled_status || "Open");
      setProgress(course.progress || 0);
      setModules((course.modules || []).map((m, i) => ({ id: `${i}-${Date.now()}`, name: m })));
      setImagePreview(course.image_url || null);
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
  const addModule = (e) => {
    e?.preventDefault();
    if (!newModule.trim()) return;
    setModules([...modules, { id: Date.now().toString(), name: newModule.trim() }]);
    setNewModule("");
  };

  const removeModule = (id) =>
    setModules(modules.filter((m) => m.id !== id));

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(modules);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setModules(items);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleSelection = (list, setList, item) => {
    if (list.includes(item)) setList(list.filter((x) => x !== item));
    else setList([...list, item]);
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("enrolled_status", enrolledStatus);
      formData.append("progress", progress);

      mode.forEach((m) => formData.append("mode", m));
      duration.forEach((d) => formData.append("duration", d));
      modules.forEach((m) => formData.append("modules", m.name));
      if (imageFile) formData.append("image", imageFile);

      const url = editingId ? `${apiUrl}${editingId}/` : apiUrl;
      const method = editingId ? "PUT" : "POST";

      const res = await authFetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Save failed");

      // Success Notification
      toast.success(editingId ? "Course updated successfully!" : "New course created!");

      closeModal();
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Error saving course. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course) => {
    const id = course._id?.$oid || course.id;
    if (!window.confirm(`Are you sure you want to delete "${course.title}"?`)) return;

    try {
      await authFetch(`${apiUrl}${id}/`, { method: "DELETE" });
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  // --- STYLES HELPER ---
  const inputClass = "w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors outline-none";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";

  // ------------------ UI ------------------
  return (
    <div className="space-y-6 relative">

      {/* 2. Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Courses Directory</h2>
          <p className="text-slate-500 text-sm mt-1">Manage All Educational Programs From One Place.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition flex items-center gap-2"
        >
          <FaPlus size={14} />
          <span>Add Course</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Mode / Duration</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loadingCourses ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading data...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">No courses found.</td></tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id?.$oid || course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center text-slate-300">
                          {course.image_url ? (
                            <img src={course.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <FaImage size={20} />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-base">{course.title}</div>
                          <div className="text-xs text-slate-500 truncate max-w-[200px]">{course.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        course.enrolled_status === 'Open' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        course.enrolled_status === 'Closed' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {course.enrolled_status || 'Open'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                        {course.price ? `$${course.price}` : <span className="text-slate-400">Free</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                          <span className="flex items-center gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            {toText(course.mode)}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-500">
                             <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                             {toText(course.duration)}
                          </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={() => openModal(course)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => handleDelete(course)}
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
                {editingId ? "Edit Course Details" : "Create New Course"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-100 rounded-full">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-6 space-y-4 flex-1 bg-slate-50/50">
              <form id="courseForm" onSubmit={handleSubmit} className="space-y-4">

                {/* 1. Basic Info Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'basic' ? '' : 'basic')}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm"
                   >
                     <span className="flex items-center gap-2"><FaLayerGroup className="text-blue-500"/> Basic Information</span>
                     {activeSection === 'basic' ? <FaChevronUp /> : <FaChevronDown />}
                   </button>

                   {activeSection === 'basic' && (
                     <div className="p-4 pt-0 border-t border-slate-100 space-y-4 mt-2">
                       <div>
                         <label className={labelClass}>Course Title</label>
                         <input required value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Masterclass in Design" />
                       </div>
                       <div>
                         <label className={labelClass}>Description</label>
                         <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className={inputClass} placeholder="Brief summary..." />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className={labelClass}>Price ($)</label>
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} />
                         </div>
                         <div>
                            <label className={labelClass}>Enrollment Status</label>
                            <select value={enrolledStatus} onChange={e => setEnrolledStatus(e.target.value)} className={inputClass}>
                              <option value="Open">Open</option>
                              <option value="Closed">Closed</option>
                              <option value="Coming Soon">Coming Soon</option>
                            </select>
                         </div>
                       </div>
                       {/* Image Upload */}
                       <div>
                          <label className={labelClass}>Course Image</label>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="w-20 h-20 bg-slate-100 rounded-lg border border-slate-200 border-dashed flex items-center justify-center overflow-hidden">
                              {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <FaImage className="text-slate-300" size={24} />}
                            </div>
                            <label className="cursor-pointer bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                                Upload Image
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                          </div>
                       </div>
                     </div>
                   )}
                </div>

                {/* 2. Attributes Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'settings' ? '' : 'settings')}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm"
                   >
                     <span className="flex items-center gap-2"><FaEdit className="text-purple-500"/> Settings & Attributes</span>
                     {activeSection === 'settings' ? <FaChevronUp /> : <FaChevronDown />}
                   </button>

                   {activeSection === 'settings' && (
                     <div className="p-4 pt-0 border-t border-slate-100 space-y-4 mt-2">
                       <div>
                          <label className={labelClass}>Mode</label>
                          <div className="flex gap-2">
                             {["Online", "Offline"].map(m => (
                               <button key={m} type="button" onClick={() => toggleSelection(mode, setMode, m)}
                                 className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                    mode.includes(m)
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                                    : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                                 }`}>
                                 {m}
                               </button>
                             ))}
                          </div>
                       </div>
                       <div>
                          <label className={labelClass}>Duration</label>
                          <div className="flex gap-2">
                             {["Short-term", "Long-term"].map(d => (
                               <button key={d} type="button" onClick={() => toggleSelection(duration, setDuration, d)}
                                 className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                    duration.includes(d)
                                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200"
                                    : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                                 }`}>
                                 {d}
                               </button>
                             ))}
                          </div>
                       </div>
                       <div>
                          <label className={labelClass}>Course Progress ({progress}%)</label>
                          <input type="range" className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" min="0" max="100" value={progress} onChange={e => setProgress(e.target.value)} />
                       </div>
                     </div>
                   )}
                </div>

                {/* 3. Curriculum Section */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'modules' ? '' : 'modules')}
                    className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors font-semibold text-slate-700 text-sm"
                   >
                     <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2"><FaLayerGroup className="text-emerald-500"/> Curriculum Modules</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">{modules.length}</span>
                     </div>
                     {activeSection === 'modules' ? <FaChevronUp /> : <FaChevronDown />}
                   </button>

                   {activeSection === 'modules' && (
                     <div className="p-4 pt-0 border-t border-slate-100 space-y-4 mt-2">
                        <div className="flex gap-2">
                          <input
                            value={newModule}
                            onChange={e => setNewModule(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addModule(e)}
                            placeholder="Type module name..."
                            className={inputClass}
                          />
                          <button type="button" onClick={addModule} className="bg-slate-800 hover:bg-black text-white px-4 rounded-lg font-medium transition-colors">Add</button>
                        </div>

                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="modal-modules-list">
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                                {modules.map((m, index) => (
                                  <Draggable key={m.id} draggableId={m.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div ref={provided.innerRef} {...provided.draggableProps}
                                        className={`flex items-center justify-between p-3 rounded-lg border bg-white transition-shadow ${
                                            snapshot.isDragging ? "shadow-lg border-blue-400 ring-1 ring-blue-100 z-50" : "border-slate-200"
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div {...provided.dragHandleProps} className="text-slate-400 cursor-grab active:cursor-grabbing hover:text-slate-600">
                                            <FaGripVertical />
                                          </div>
                                          <span className="text-sm font-medium text-slate-700">{m.name}</span>
                                        </div>
                                        <button type="button" onClick={() => removeModule(m.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                                            <FaTrash size={14}/>
                                        </button>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
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
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Course"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
