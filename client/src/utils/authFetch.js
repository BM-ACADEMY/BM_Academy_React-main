// src/utils/authFetch.js
export const authFetch = async (url, options = {}) => {
  let token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // If no token, user is not logged in
  if (!token) throw new Error("User not logged in");

  // Function to make request with token
  const makeRequest = async (tokenToUse) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenToUse}`,
        ...(options.headers || {}),
      },
    });
    return res;
  };

  let res = await makeRequest(token);

  // If 401 and refresh token exists, try refreshing
  if (res.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(`${import.meta.env.VITE_BASE_URI}auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshRes.ok) throw new Error("Refresh token failed");

      const refreshData = await refreshRes.json();
      token = refreshData.access;
      localStorage.setItem("token", token);

      // Retry original request with new token
      res = await makeRequest(token);
    } catch (err) {
      // Refresh failed → clear session
      console.error("Refresh failed:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      throw new Error("Session expired. Please login again.");
    }
  }

  // Still 401 → unauthorized
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    throw new Error("Unauthorized. Please login again.");
  }

  // Handle other non-2xx errors
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Request failed: ${res.status} ${errorText}`);
  }

  // Parse JSON
  try {
    return await res.json();
  } catch (err) {
    throw new Error("Failed to parse response JSON");
  }
};
