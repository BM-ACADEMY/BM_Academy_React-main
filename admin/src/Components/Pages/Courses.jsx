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

// --- ICONS & UI HELPERS ---
const XIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ChevronDown = ({ isOpen }) => <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const DragHandle = () => <svg className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>;

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
  const [activeSection, setActiveSection] = useState("basic"); // basic, modules, settings

  // ------------------ FETCH ------------------
  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const res = await authFetch(apiUrl);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load courses");
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

      // alert(editingId ? "Course updated" : "Course created");
      closeModal();
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Error saving course");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course) => {
    const id = course._id?.$oid || course.id;
    if (!window.confirm(`Are you sure you want to delete "${course.title}"?`)) return;
    await authFetch(`${apiUrl}${id}/`, { method: "DELETE" });
    fetchCourses();
  };

  // ------------------ UI ------------------
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses Directory</h1>
          <p className="text-gray-500 text-sm">Manage all educational programs from one place.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition flex items-center gap-2"
        >
          <span>+ Add Course</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Mode / Duration</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loadingCourses ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">Loading data...</td></tr>
              ) : courses.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">No courses found.</td></tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id?.$oid || course.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                          {course.image_url && <img src={course.image_url} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{course.title}</div>
                          <div className="text-xs text-gray-500 truncate w-48">{course.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.enrolled_status === 'Open' ? 'bg-green-100 text-green-800' :
                        course.enrolled_status === 'Closed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.enrolled_status || 'Open'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-600">${course.price || '0'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                         <span className="text-gray-600">Mode: {toText(course.mode)}</span>
                         <span className="text-gray-600">Dur: {toText(course.duration)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openModal(course)} className="text-indigo-600 hover:text-indigo-900 font-medium mr-4">Edit</button>
                      <button onClick={() => handleDelete(course)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-bold text-gray-800">{editingId ? "Edit Course" : "Create New Course"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition"><XIcon /></button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-5 space-y-4 flex-1">
              <form id="courseForm" onSubmit={handleSubmit}>

                {/* 1. Basic Info Section */}
                <div className="border rounded-lg overflow-hidden">
                   <button type="button" onClick={() => setActiveSection(activeSection === 'basic' ? '' : 'basic')} className="w-full flex justify-between items-center p-4 bg-gray-50 font-semibold text-gray-700">
                     <span>Basic Information</span>
                     <ChevronDown isOpen={activeSection === 'basic'} />
                   </button>
                   {activeSection === 'basic' && (
                     <div className="p-4 space-y-4 bg-white">
                        <div>
                          <label className="label">Course Title</label>
                          <input required value={title} onChange={e => setTitle(e.target.value)} className="input-field" placeholder="e.g. Masterclass in Design" />
                        </div>
                        <div>
                          <label className="label">Description</label>
                          <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="input-field" placeholder="Brief summary..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="label">Price ($)</label>
                             <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input-field" />
                          </div>
                          <div>
                             <label className="label">Enrollment Status</label>
                             <select value={enrolledStatus} onChange={e => setEnrolledStatus(e.target.value)} className="input-field">
                               <option value="Open">Open</option>
                               <option value="Closed">Closed</option>
                               <option value="Coming Soon">Coming Soon</option>
                             </select>
                          </div>
                        </div>
                        {/* Image Upload inside Basic Info */}
                        <div>
                           <label className="label">Course Image</label>
                           <div className="flex items-center gap-3 mt-1">
                             <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                               {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">No Img</span>}
                             </div>
                             <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                           </div>
                        </div>
                     </div>
                   )}
                </div>

                {/* 2. Attributes Section */}
                <div className="border rounded-lg overflow-hidden mt-3">
                   <button type="button" onClick={() => setActiveSection(activeSection === 'settings' ? '' : 'settings')} className="w-full flex justify-between items-center p-4 bg-gray-50 font-semibold text-gray-700">
                     <span>Settings & Attributes</span>
                     <ChevronDown isOpen={activeSection === 'settings'} />
                   </button>
                   {activeSection === 'settings' && (
                     <div className="p-4 space-y-4 bg-white">
                        <div>
                           <label className="label mb-2 block">Mode</label>
                           <div className="flex gap-2">
                              {["Online", "Offline"].map(m => (
                                <button key={m} type="button" onClick={() => toggleSelection(mode, setMode, m)}
                                  className={`badge-btn ${mode.includes(m) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}>
                                  {m}
                                </button>
                              ))}
                           </div>
                        </div>
                        <div>
                           <label className="label mb-2 block">Duration</label>
                           <div className="flex gap-2">
                              {["Short-term", "Long-term"].map(d => (
                                <button key={d} type="button" onClick={() => toggleSelection(duration, setDuration, d)}
                                  className={`badge-btn ${duration.includes(d) ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-600 border-gray-300"}`}>
                                  {d}
                                </button>
                              ))}
                           </div>
                        </div>
                        <div>
                           <label className="label">Course Progress ({progress}%)</label>
                           <input type="range" className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="0" max="100" value={progress} onChange={e => setProgress(e.target.value)} />
                        </div>
                     </div>
                   )}
                </div>

                {/* 3. Curriculum Section */}
                <div className="border rounded-lg overflow-hidden mt-3">
                   <button type="button" onClick={() => setActiveSection(activeSection === 'modules' ? '' : 'modules')} className="w-full flex justify-between items-center p-4 bg-gray-50 font-semibold text-gray-700">
                     <span>Curriculum Modules</span>
                     <div className="flex items-center gap-2">
                       <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{modules.length}</span>
                       <ChevronDown isOpen={activeSection === 'modules'} />
                     </div>
                   </button>
                   {activeSection === 'modules' && (
                     <div className="p-4 bg-white">
                        <div className="flex gap-2 mb-3">
                          <input
                            value={newModule}
                            onChange={e => setNewModule(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addModule(e)}
                            placeholder="Type module name..."
                            className="input-field flex-1"
                          />
                          <button type="button" onClick={addModule} className="bg-gray-800 text-white px-4 rounded-lg font-medium hover:bg-black">Add</button>
                        </div>

                        <DragDropContext onDragEnd={handleDragEnd}>
                          <Droppable droppableId="modal-modules-list">
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                {modules.map((m, index) => (
                                  <Draggable key={m.id} draggableId={m.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div ref={provided.innerRef} {...provided.draggableProps} className={`flex items-center justify-between p-3 rounded border bg-white ${snapshot.isDragging ? "shadow-lg border-indigo-400" : "border-gray-200"}`}>
                                        <div className="flex items-center gap-3">
                                          <div {...provided.dragHandleProps}><DragHandle /></div>
                                          <span className="text-sm font-medium text-gray-700">{m.name}</span>
                                        </div>
                                        <button type="button" onClick={() => removeModule(m.id)} className="text-red-400 hover:text-red-600 text-xl font-bold leading-none">&times;</button>
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
            <div className="p-5 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
              <button onClick={closeModal} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 shadow-md"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Course"}
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .input-field { width: 100%; border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.625rem; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #4f46e5; ring: 2px solid #e0e7ff; }
        .label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 0.25rem; display: block; }
        .badge-btn { padding: 0.375rem 1rem; border-radius: 9999px; border-width: 1px; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
      `}</style>
    </div>
  );
}
