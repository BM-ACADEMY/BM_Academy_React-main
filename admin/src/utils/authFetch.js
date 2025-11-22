export const useAuthFetch = () => {
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    // Don't auto-redirect; let the component handle 401
    if (res.status === 401) {
      // Optional: remove token if invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // return the response so component can handle it
      return res;
    }

    return res;
  };

  return authFetch;
};
