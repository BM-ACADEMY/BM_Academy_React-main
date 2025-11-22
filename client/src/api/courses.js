export const fetchCourses = async () => {
  try {
    const res = await fetch("${import.meta.env.VITE_BASE_URI}courses"); // your backend URL
    if (!res.ok) throw new Error("Failed to fetch courses");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
