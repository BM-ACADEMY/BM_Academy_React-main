// admin/src/utils/authFetch.js
export const useAuthFetch = () => {
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("access_token");

    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_email");
      window.location.href = "/login"; // hard redirect safety
    }

    return res;
  };

  return authFetch;
};
