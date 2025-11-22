import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAuthFetch } from "../../utils/authFetch";

const apiUrl = `${import.meta.env.VITE_BASE_URI.replace(/\/$/, "")}/courses/`;

export default function Courses() {
  const authFetch = useAuthFetch();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("Online");
  const [duration, setDuration] = useState("Short-term");
  const [enrolledStatus, setEnrolledStatus] = useState("Open");
  const [progress, setProgress] = useState(0); // ✅ New progress field
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // ------------------ Fetch Courses ------------------
  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const res = await authFetch(apiUrl);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      alert("Error fetching courses! Check console.");
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ------------------ Reset Form ------------------
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setMode("Online");
    setDuration("Short-term");
    setEnrolledStatus("Open");
    setProgress(0);
    setModules([]);
    setNewModule("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  // ------------------ Modules ------------------
  const addModule = () => {
    if (newModule.trim()) {
      setModules([...modules, { id: Date.now().toString(), name: newModule.trim() }]);
      setNewModule("");
    }
  };
  const removeModule = (id) => setModules(modules.filter((m) => m.id !== id));
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(modules);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setModules(reordered);
  };

  // ------------------ Submit Form ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("mode", mode);
      formData.append("duration", duration);
      formData.append("enrolled_status", enrolledStatus);
      formData.append("progress", progress); // ✅ Include progress
      if (imageFile) formData.append("image", imageFile);
      modules.forEach((m) => formData.append("modules", m.name));

      const url = editingId ? `${apiUrl}${editingId}/` : apiUrl;
      const method = editingId ? "PUT" : "POST";

      const res = await authFetch(url, { method, body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to save course");
      }

      alert(editingId ? "Course updated successfully!" : "Course added successfully!");
      resetForm();
      fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Error saving course! Check console.");
    } finally {
      setSaving(false);
    }
  };

  // ------------------ Edit & Delete ------------------
  const handleEdit = (course) => {
    const id = course._id?.$oid || course.id;
    setEditingId(id);
    setTitle(course.title);
    setDescription(course.description);
    setPrice(course.price);
    setMode(course.mode);
    setDuration(course.duration);
    setEnrolledStatus(course.enrolled_status);
    setProgress(course.progress || 0); // ✅ Load progress
    setModules((course.modules || []).map((m, i) => ({ id: `${i}-${m}`, name: m })));
    setImagePreview(course.image_url || null);
    setImageFile(null);
  };

  const handleDelete = async (course) => {
    const id = course._id?.$oid || course.id;
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await authFetch(`${apiUrl}${id}/`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to delete course");
      }
      alert("Course deleted successfully!");
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Error deleting course! Check console.");
    }
  };

  // ------------------ Render ------------------
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{editingId ? "Edit Course" : "Add Course"}</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-lg rounded-lg p-6 mb-8">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="border p-2 rounded col-span-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded col-span-2" rows={3} />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required className="border p-2 rounded" />
        <select value={mode} onChange={(e) => setMode(e.target.value)} className="border p-2 rounded">
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        <select value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2 rounded">
          <option value="Short-term">Short-term</option>
          <option value="Long-term">Long-term</option>
        </select>
        <select value={enrolledStatus} onChange={(e) => setEnrolledStatus(e.target.value)} className="border p-2 rounded">
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Ongoing">Ongoing</option>
        </select>

        {/* Progress input */}
        <input
          type="number"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Progress %"
          className="border p-2 rounded"
        />

        {/* Image Upload */}
        <div className="col-span-2">
          <input type="file" onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setImagePreview(reader.result);
              reader.readAsDataURL(file);
            } else setImagePreview(null);
          }} className="border p-2 rounded w-full" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-40 h-40 object-cover rounded shadow" />}
        </div>

        {/* Modules */}
        <div className="col-span-2">
          <div className="flex gap-2">
            <input value={newModule} onChange={(e) => setNewModule(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addModule())}
              onBlur={() => newModule.trim() && addModule()}
              placeholder="Add module" className="border p-2 rounded flex-1" />
            <button type="button" onClick={addModule} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">+</button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="modules">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="mt-3 flex flex-col gap-2">
                  {modules.map((mod, i) => (
                    <Draggable key={mod.id} draggableId={mod.id} index={i}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-gray-100 px-3 py-2 rounded flex justify-between items-center shadow-sm">
                          <span>{mod.name}</span>
                          <button type="button" onClick={() => removeModule(mod.id)} className="text-red-500 font-bold hover:text-red-700">×</button>
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

        <button type="submit" disabled={saving} className={`col-span-2 ${saving ? "bg-gray-400" : "bg-green-600"} text-white py-2 rounded hover:bg-green-700 transition`}>
          {saving ? "Saving..." : editingId ? "Update Course" : "Add Course"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      {loadingCourses ? (
        <p>Loading courses...</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => {
            const courseId = course._id?.$oid || course.id;
            return (
              <li key={courseId} className="bg-white shadow-md p-4 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-700">{course.description}</p>
                  <p className="text-sm">Price: {course.price}</p>
                  <p className="text-sm">Mode: {course.mode}</p>
                  <p className="text-sm">Duration: {course.duration}</p>
                  <p className="text-sm">Status: {course.enrolled_status}</p>
                  <p className="text-sm">Modules: {(course.modules || []).join(", ")}</p>

                  {/* ✅ Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                      className={`h-3 rounded-full ${course.progress >= 100 ? "bg-green-500" : "bg-blue-500"}`}
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{course.progress || 0}% completed</p>
                </div>

                {course.image_url && <img src={course.image_url} width="120" alt={course.title} className="mt-2 md:mt-0 rounded" />}
                <div className="mt-2 flex gap-2 md:mt-0">
                  <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
                  <button onClick={() => handleDelete(course)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
