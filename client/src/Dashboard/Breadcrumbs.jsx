// client/src/Dashboard/Breadcrumbs.jsx
import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumbs({ items }) {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`${
              index === items.length - 1
                ? "text-gray-900 font-semibold"
                : "hover:underline cursor-pointer"
            }`}
          >
            {item}
          </span>
          {index < items.length - 1 && (
            <FaChevronRight className="mx-2 text-gray-400" size={10} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
