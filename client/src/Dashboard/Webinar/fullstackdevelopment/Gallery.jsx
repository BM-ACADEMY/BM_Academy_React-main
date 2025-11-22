import React, { useState } from "react";
import img1 from "../../../assets/img/FSD/IMG-20251111-WA0004.jpg";
import img2 from "../../../assets/img/FSD/IMG-20251031-WA0006.jpg";
import img3 from "../../../assets/img/FSD/IMG_20251110_171512.jpg";
import img4 from "../../../assets/img/FSD/IMG20251004123717.jpg";
import img5 from "../../../assets/img/FSD/IMG_20251103_112253.jpg";

// 👉 Add your new images here later
const images = [];

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="py-20 bg-white relative" id="gallery">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
          Our <span className="text-[#cb2800]">Gallery</span>
        </h2>

        {/* If no images */}
        {images.length === 0 ? (
          <p className="text-gray-600 text-lg">No images added yet.</p>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentImages.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={img.src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#cb2800] text-white hover:bg-[#a12000]"
                }`}
              >
                Prev
              </button>

              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#cb2800] text-white hover:bg-[#a12000]"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
