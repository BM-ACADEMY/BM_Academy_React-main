// Routes/Categories.jsx
import Categories from "../components/Categories/Categories";
import SubCategories from "../components/Categories/SubCategories";

const CategoriesRoutes = () => {
  return (
    <Routes>
      {/* /categories */}
      <Route index element={<Categories />} />

      {/* /categories/:categoryId */}
      <Route path=":categoryId" element={<SubCategories />} />
    </Routes>
  );
};

export default CategoriesRoutes;
