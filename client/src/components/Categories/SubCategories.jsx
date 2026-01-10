import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowRight,
  Clock,
  LayoutGrid,
  ArrowUpRight,
  Globe,
  Loader2
} from "lucide-react";

const SubCategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- PRICE HELPER (NEW) ---------------- */
  const getFinalPrice = (sub) => {
    if (sub.is_free) return "FREE";

    if (sub.offer_percentage) {
      const discounted =
        sub.price - (sub.price * sub.offer_percentage) / 100;
      return Math.round(discounted);
    }

    return sub.price;
  };

  /* ---------------- FETCH SUB CATEGORIES ---------------- */
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URI}public/sub-categories/?category_id=${categoryId}`
      );
      if (!res.ok) throw new Error("Failed to load sub categories");
      const data = await res.json();
      setSubCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load programs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    if (categoryId) fetchSubCategories();
  }, [categoryId]);

  /* ---------------- CLICK HANDLER (UNCHANGED) ---------------- */
  const handleSubCategoryClick = async (subCategoryId) => {
    if (!subCategoryId) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URI}courses/?sub_category_id=${subCategoryId}`
      );
      if (!res.ok) throw new Error("Failed to load courses");
      const courses = await res.json();

      if (!Array.isArray(courses) || courses.length === 0) {
        alert("No courses found for this program");
        return;
      }

      if (courses.length === 1) {
        const courseId =
          courses[0].id || courses[0]._id?.$oid || courses[0]._id;
        navigate(`/courses/${courseId}`);
        return;
      }

      navigate(`/courses/sub-category/${subCategoryId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to load courses");
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-white">
        <Loader2 className="animate-spin h-10 w-10 text-[#FFEA00]" />
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="text-center py-32 text-red-500 font-bold bg-white">
        {error}
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-white min-h-screen py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-8">

        {/* HEADER */}
        <div className="mb-12 border-b border-gray-100 pb-8" data-aos="fade-right">
          <div className="inline-block px-3 py-1 bg-[#FFEA00] text-black font-bold uppercase tracking-widest text-xs mb-4 skew-x-[-10deg]">
            <span className="block skew-x-[10deg]">Select Program</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] leading-none uppercase">
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEA00] to-yellow-600">
              Path
            </span>
          </h2>
        </div>

        {subCategories.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">
              No programs found for this category.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-sm font-bold text-black border-b-2 border-[#FFEA00] pb-1"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCategories.map((sub, i) => (
              <div
                key={sub.id}
                onClick={() => handleSubCategoryClick(sub.id)}
                className="group cursor-pointer relative h-80 w-full overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-sm"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >

                {/* BACKGROUND IMAGE */}
                {sub.image ? (
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-70 group-hover:opacity-50"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <LayoutGrid size={60} className="text-white" />
                  </div>
                )}

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                {/* BOTTOM HOVER BORDER */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFEA00] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                {/* OFFER LABEL */}
                {sub.offer_label && (
                  <div className="absolute top-0 left-0 bg-[#FFEA00] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-20">
                    {sub.offer_label}
                  </div>
                )}

                {/* CONTENT */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">

                  {/* FLOATING ARROW */}
                  <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </div>

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                    <div className="w-10 h-1 bg-[#FFEA00] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

                    <h3 className="text-2xl font-extrabold text-white uppercase leading-tight mb-2 group-hover:text-[#FFEA00] transition-colors">
                      {sub.name}
                    </h3>

                    {/* PRICE (NEW) */}
                    <div className="mb-2">
                      {sub.is_free ? (
                        <span className="inline-block px-3 py-1 text-xs font-extrabold text-green-700 bg-green-100 rounded-full">
                          FREE
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-extrabold text-white group-hover:text-[#FFEA00] transition-colors">
                            ₹{getFinalPrice(sub)}
                          </span>
                          {sub.offer_percentage && (
                            <>
                              <span className="text-sm line-through text-gray-400">
                                ₹{sub.price}
                              </span>
                              <span className="text-xs font-bold text-green-400">
                                {sub.offer_percentage}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* META */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-300 text-xs font-bold uppercase tracking-wider">
                      {sub.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-[#FFEA00]" />
                          <span>{sub.duration}</span>
                        </div>
                      )}
                      {Array.isArray(sub.mode) && sub.mode.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Globe size={14} className="text-[#FFEA00]" />
                          <span>{sub.mode[0]}</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategories;
