import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: "https://sp-globalnomad-api.vercel.app/4-17",
});

instance.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get("refreshToken");
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      const res = await instance.post(
        "/auth/tokens",
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}`, _retry: true },
        },
      );
      const accessToken = res.data.accessToken;
      const nextRefreshToken = res.data.refreshToken;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", nextRefreshToken);
      originalRequest._retry = true;

      return instance(originalRequest);
    }
    return Promise.reject(error);
  },
);
