import React from "react";
import { Routes, Route } from "react-router-dom";

import CoursesIntroBanner from "../components/Courses/CoursesIntroBanner";
import CoursesList from "../components/Courses/CoursesList";
import CourseDetail from "../components/Courses/CourseDetail";
import Categories from "../components/Categories/Categories";
import SubCategories from "../components/Categories/SubCategories";
import Courses from "../components/Courses/Courses";

const Coursesroutes = () => {
  return (
    <Routes>

      {/* 1️⃣ Landing page → Categories */}
      <Route
        index
        element={
          <>
            <CoursesIntroBanner />
            <Categories />
            <Courses/>
          </>
        }
      />

      {/* 2️⃣ Sub-categories (by category) */}
      <Route
        path="category/:categoryId"
        element={<SubCategories />}
      />

      {/* 3️⃣ Courses (by sub-category) ✅ THIS WAS MISSING */}
      <Route
        path="sub-category/:subCategoryId"
        element={<CoursesList />}
      />

      {/* 4️⃣ Course detail */}
      <Route
        path=":courseId"
        element={<CourseDetail />}
      />

    </Routes>
  );
};

export default Coursesroutes;
