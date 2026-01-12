import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loader2, ArrowRight, LayoutGrid, ArrowUpRight } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ---------- FETCH LOGIC ----------
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URI}public/categories/`
        );
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="py-32 flex justify-center bg-white"><Loader2 className="animate-spin text-[#FFEA00] w-10 h-10"/></div>;
  if (error) return <div className="py-32 text-center text-red-500 font-bold bg-white">{error}</div>;

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-8">

        {/* HEADER (Matches Your Banner Style) */}
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-gray-100 pb-8">
            <div data-aos="fade-right">
                <div className="inline-block px-3 py-1 bg-[#FFEA00] text-black font-bold uppercase tracking-widest text-xs mb-4 skew-x-[-10deg]">
                    <span className="block skew-x-[10deg]">Academic Programs</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] leading-none uppercase">
                    Explore <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFEA00] to-yellow-600">
                        Categories
                    </span>
                </h2>
            </div>
            
        </div>

        {/* GRID: OVERLAY TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/courses/category/${cat.id}`)}
              className="group cursor-pointer relative h-80 w-full overflow-hidden bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >

              {/* BACKGROUND IMAGE */}
              {cat.image ? (
                <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-60 group-hover:opacity-40"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <LayoutGrid size={60} className="text-white" />
                </div>
              )}

              {/* DARK GRADIENT OVERLAY (Always visible for text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300" />

              {/* YELLOW HOVER BORDER (Slides in from bottom) */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFEA00] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">

                {/* Floating Top Right Arrow */}
                <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500">
                    <ArrowUpRight size={18} />
                </div>

                {/* Text Content */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Yellow Line Decoration */}
                    <div className="w-12 h-1 bg-[#FFEA00] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

                    <h3 className="text-2xl font-extrabold text-white uppercase leading-tight mb-2">
                        {cat.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-300 text-xs font-bold uppercase tracking-widest group-hover:text-[#FFEA00] transition-colors duration-300">
                        <span>Explore Program</span>
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 md:hidden">
            <button
                onClick={() => navigate('/courses')}
                className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-[#FFEA00] text-black font-bold uppercase tracking-wider shadow-lg"
            >
                View All Categories <ArrowRight size={18} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default Categories;
