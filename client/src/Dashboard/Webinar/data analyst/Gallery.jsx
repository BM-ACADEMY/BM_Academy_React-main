import React, { useState } from "react";
import img4 from "../../../assets/img/img4.jpeg";
import img5 from "../../../assets/img/img5.jpeg";
import img6 from "../../../assets/img/img6.jpeg";
import img7 from "../../../assets/img/img7.jpeg";
import img8 from "../../../assets/img/img8.jpg";
import img9 from "../../../assets/img/img9.jpg";
import img10 from "../../../assets/img/img10.jpg";
import img13 from "../../../assets/img/img13.webp";
import img15 from "../../../assets/img/img15.jpeg";
import img16 from "../../../assets/img/img16.jpeg";
import img17 from "../../../assets/img/img17.jpeg";
import img19 from "../../../assets/img/img19.jpeg";

const images = [
  { src: img4 },
  { src: img5 },
  { src: img6 },
  { src: img7 },
  { src: img8 },
  { src: img9 },
  { src: img10 },
  { src: img13 },
  { src: img15 },
  { src: img16 },
  { src: img17 },
  { src: img19 },
];

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

        {/* ✅ Simple Clean Grid (No Hover Overlay) */}
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

        {/* ✅ Pagination Controls */}
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
      </div>
    </section>
  );
};

export default Gallery;
