import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursesIntroBanner from "../components/Courses/CoursesIntroBanner";
import CoursesList from "../components/Courses/CoursesList";
import CourseDetail from "../components/Courses/CourseDetail";
import Courses from "../components/Courses/Courses";

const Coursesroutes = () => {
  return (
    <Routes>
  {/* Main courses page */}
  <Route
    index
    element={
      <div>
        <CoursesIntroBanner />
        <CoursesList />
        <Courses />
      </div>
    }
  />

  {/* Individual course detail page */}
  <Route path=":courseId" element={<CourseDetail />} />
</Routes>

  );
};

export default Coursesroutes;
