import React, { useState } from "react";
import img1 from "../../../assets/img/DM/IMG-20251031-WA0003.jpg";
import img2 from "../../../assets/img/DM/IMG-20251031-WA0004.jpg";
import img3 from "../../../assets/img/DM/IMG-20251031-WA0005.jpg";
import img4 from "../../../assets/img/DM/IMG20251004133307.jpg";
import img5 from "../../../assets/img/DM/IMG20251004133357.jpg";

// ✅ Add all images here
const images = [
  { src: img1 },
  { src: img2 },
  { src: img3 },
  { src: img4 },
  { src: img5 },
];

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // shows all 5 on one page

  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = images.slice(indexOfFirst, indexOfLast);

  return (
    <section className="py-20 bg-white relative" id="gallery">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
          Our <span className="text-[#cb2800]">Gallery</span>
        </h2>

        {/* Gallery Grid */}
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
      </div>
    </section>
  );
};

export default Gallery;
