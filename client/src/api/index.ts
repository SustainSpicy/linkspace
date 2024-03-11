import axios from "axios";
import { jwtDecode } from "jwt-decode";

const serverBaseUrl = import.meta.env.VITE_API_URL;

const PublicApi = axios.create({
  baseURL: serverBaseUrl,
});
const PrivateApi = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
});

PrivateApi.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const { accessToken } = JSON.parse(user);

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

PrivateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      try {
        const user = localStorage.getItem("user");

        if (user !== null) {
          const { refreshToken, ...rest } = JSON.parse(user);

          if (refreshToken) {
            console.log("new access Token");

            const newAccessToken = await refreshAccessToken(refreshToken);

            localStorage.setItem(
              "user",
              JSON.stringify({
                ...rest,
                refreshToken,
                accessToken: newAccessToken,
              })
            );
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axios(originalRequest);
          } else {
            // Clear local storage and log user out
            localStorage.removeItem("user");
          }
        }
      } catch (refreshError: any) {
        localStorage.removeItem("user");
        console.log("Error refreshing access token:", refreshError);
      }
    }
    // console.log("response,", response);

    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken: string) {
  try {
    // Make a request to your server's refresh token endpoint
    const response = await PublicApi.post(`${serverBaseUrl}/jwt/refreshToken`, {
      refreshToken: refreshToken,
    });

    const newAccessToken = response.data.accessToken;

    // Return the new access token
    return newAccessToken;
  } catch (error) {
    // console.log("Error refreshing access token:", error);
    throw error;
  }
}
export { PublicApi, PrivateApi };
