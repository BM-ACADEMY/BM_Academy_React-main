import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
  FaGlobe,
  FaLaptop,
  FaRupeeSign,
  FaPercent,
  FaTag
} from "react-icons/fa";
import { useAuthFetch } from "../../utils/authFetch";

const BASE = import.meta.env.VITE_BASE_URI.replace(/\/$/, "");
const CATEGORY_API = `${BASE}/categories/`;
const SUB_API = `${BASE}/sub-categories/`;

export default function SubCategories() {
  const authFetch = useAuthFetch();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [language, setLanguage] = useState([]);
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState([]);
  const [offerLabel, setOfferLabel] = useState("");

  // ✅ NEW PRICING FIELDS
  const [price, setPrice] = useState("");
  const [offerPercentage, setOfferPercentage] = useState("");
  const [isFree, setIsFree] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    try {
      setLoading(true);
      const catRes = await authFetch(CATEGORY_API);
      const subRes = await authFetch(SUB_API);

      const catData = await catRes.json();
      const subData = await subRes.json();

      setCategories(Array.isArray(catData) ? catData : []);
      setSubCategories(Array.isArray(subData) ? subData : []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- HELPERS ---------------- */
  const toggle = (value, list, setList) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const resetForm = () => {
    setCategoryId("");
    setName("");
    setImageFile(null);
    setPreview(null);
    setLanguage([]);
    setDuration("");
    setMode([]);
    setOfferLabel("");
    setEditingId(null);
    // Reset Pricing
    setPrice("");
    setOfferPercentage("");
    setIsFree(false);
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setCategoryId(item.category_id);
      setName(item.name);
      setPreview(item.image || null);
      setImageFile(null);
      setLanguage(item.language || []);
      setDuration(item.duration || "");
      setMode(item.mode || []);
      setOfferLabel(item.offer_label || "");
      // Set Pricing
      setPrice(item.price ?? "");
      setOfferPercentage(item.offer_percentage ?? "");
      setIsFree(item.is_free ?? false);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId || !name.trim()) {
      toast.error("Category and name are required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("category_id", categoryId);
      formData.append("name", name);
      formData.append("duration", duration);
      formData.append("offer_label", offerLabel);
      formData.append("is_free", isFree);

      language.forEach((l) => formData.append("language", l));
      mode.forEach((m) => formData.append("mode", m));

      // Pricing Logic
      if (!isFree) {
        formData.append("price", price || 0);
        if (offerPercentage) {
          formData.append("offer_percentage", offerPercentage);
        }
      }

      if (imageFile) formData.append("image", imageFile);

      const res = await authFetch(
        editingId ? `${SUB_API}${editingId}/` : SUB_API,
        {
          method: editingId ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error();

      toast.success(editingId ? "Sub-category updated" : "Sub-category created");
      closeModal();
      fetchData();
    } catch {
      toast.error("Operation failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sub-category?")) return;

    try {
      const res = await authFetch(`${SUB_API}${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Sub-category deleted");
      fetchData();
    } catch {
      toast.error("Cannot delete (courses may exist)");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-8 min-h-screen bg-gray-50 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6 px-1">
        <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Sub-Category Management</h2>
            <p className="text-gray-500 text-sm mt-1">Define Learning Tracks, Pricing, and Details.</p>
        </div>

        <button
          onClick={() => openModal()}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg shadow-gray-200"
        >
          <FaPlus size={12} /> Add Sub-Category
        </button>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Category / Name</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-10 text-gray-400">Loading data...</td></tr>
              ) : subCategories.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-10 text-gray-400">No sub-categories found.</td></tr>
              ) : (
                subCategories.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Image */}
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {s.image ? (
                          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          <FaImage className="text-gray-300" />
                        )}
                      </div>
                    </td>

                    {/* Name & Category */}
                    <td className="px-6 py-3">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-0.5">{s.category_name || "-"}</div>
                        <div className="font-bold text-gray-900 text-base">{s.name}</div>
                        {s.offer_label && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded border border-gray-200">
                                <FaTag size={8} /> {s.offer_label}
                            </span>
                        )}
                    </td>

                    {/* Pricing Column (NEW) */}
                    <td className="px-6 py-3">
                        {s.is_free ? (
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-md border border-green-200">
                                Free Program
                            </span>
                        ) : (
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 text-base flex items-center">
                                    <FaRupeeSign size={12} /> {s.price?.toLocaleString()}
                                </span>
                                {s.offer_percentage > 0 && (
                                    <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-1.5 rounded w-fit mt-0.5 border border-yellow-100">
                                        {s.offer_percentage}% OFF
                                    </span>
                                )}
                            </div>
                        )}
                    </td>

                    {/* Details (Mode/Lang) */}
                    <td className="px-6 py-3">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex gap-1 flex-wrap">
                                {(s.mode || []).map(m => (
                                    <span key={m} className="flex items-center gap-1 px-2 py-0.5 rounded border bg-blue-50 border-blue-100 text-blue-700 text-[10px] font-bold uppercase">
                                        <FaLaptop size={8} /> {m}
                                    </span>
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span className="flex items-center gap-1"><FaGlobe size={10} /> {(s.language || []).join(", ")}</span>
                                <span className="text-gray-300">|</span>
                                <span>{s.duration}</span>
                            </div>
                        </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal(s)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
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
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? "Edit Sub-Category" : "Create Sub-Category"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

              {/* 1. Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Parent Category</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. React JS"
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Duration</label>
                    <input
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 3 Months"
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
              </div>

              {/* 2. Pricing Section (NEW UI) */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pricing & Offers</label>

                      {/* Free Checkbox */}
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm font-bold text-gray-800">Mark as Free</span>
                      </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Price Input */}
                      <div className="relative">
                          <span className={`absolute left-3 top-3.5 text-gray-400 ${isFree ? 'opacity-50' : ''}`}><FaRupeeSign size={14} /></span>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={isFree}
                            placeholder="Price (e.g. 25000)"
                            className="w-full border border-gray-200 pl-8 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100 disabled:text-gray-400"
                          />
                      </div>

                      {/* Offer Percentage */}
                      <div className="relative">
                          <span className={`absolute left-3 top-3.5 text-gray-400 ${isFree ? 'opacity-50' : ''}`}><FaPercent size={12} /></span>
                          <input
                            type="number"
                            value={offerPercentage}
                            onChange={(e) => setOfferPercentage(e.target.value)}
                            disabled={isFree}
                            placeholder="Discount % (e.g. 20)"
                            className="w-full border border-gray-200 pl-8 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100 disabled:text-gray-400"
                          />
                      </div>
                  </div>
              </div>

              {/* 3. Details & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Offer Label</label>
                    <input
                        value={offerLabel}
                        onChange={(e) => setOfferLabel(e.target.value)}
                        placeholder="e.g. Best Seller"
                        className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  {/* Mode & Language */}
                  <div className="space-y-3">
                      <div className="flex gap-2">
                        {["Online", "Offline"].map((m) => (
                        <button
                            type="button"
                            key={m}
                            onClick={() => toggle(m, mode, setMode)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                            mode.includes(m) ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            {m}
                        </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {["English", "Tamil"].map((l) => (
                        <button
                            type="button"
                            key={l}
                            onClick={() => toggle(l, language, setLanguage)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                            language.includes(l) ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            {l}
                        </button>
                        ))}
                      </div>
                  </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Thumbnail</label>
                {preview ? (
                    <div className="relative h-40 w-full rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => { setPreview(null); setImageFile(null); }}
                            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded shadow-sm text-red-500 hover:bg-white"
                        >
                            <FaTrash size={12} />
                        </button>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer relative bg-gray-50">
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

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#FFEA00] text-black px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-100"
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
}
