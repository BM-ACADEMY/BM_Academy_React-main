// src/components/home/TrendingCourses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TrendingCourses() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const THEME = {
    bg: "#0B1120",
    cardBg: "#151F32",
    yellow: "#FFEA00",
    textMuted: "#94A3B8",
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URI}public/categories/`
        );
        if (!res.ok) throw new Error("Failed to load categories");

        const data = await res.json();

        // ✅ latest 4 categories
        const latest = Array.isArray(data)
          ? data.slice(-4).reverse()
          : [];

        setCategories(latest);
      } catch (err) {
        console.error(err);
        setError("Could not load categories");
      } finally {
        setLoading(false);
        setTimeout(() => AOS.refresh(), 100);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-24 px-6" style={{ backgroundColor: THEME.bg }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-80 rounded-xl animate-pulse opacity-50"
              style={{ backgroundColor: THEME.cardBg }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-center py-24 text-red-400"
        style={{ backgroundColor: THEME.bg }}
      >
        {error}
      </div>
    );
  }

  return (
    <section
      className="relative py-24 px-6 md:px-12"
      style={{ backgroundColor: THEME.bg }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Latest <span style={{ color: THEME.yellow }}>Categories</span>
          </h2>
          <p className="text-lg" style={{ color: THEME.textMuted }}>
            Explore our newest academic programs
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              onClick={() => navigate(`/courses/category/${cat.id}`)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-[#FFEA00] transition-all"
              style={{ backgroundColor: THEME.cardBg }}
            >
              {/* IMAGE */}
              <div className="h-48 relative overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <LayoutGrid size={40} className="text-slate-500" />
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  {cat.name}
                </h3>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#FFEA00]">
                  Explore <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black"
            style={{ backgroundColor: THEME.yellow }}
          >
            View All Categories
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
