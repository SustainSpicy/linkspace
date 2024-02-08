import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

const serverBaseUrl = "http://localhost:5000";

const PublicApi = axios.create({
  baseURL: serverBaseUrl,
});
const PrivateApi = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
});

PrivateApi.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken !== null) {
      const parsedToken = JSON.parse(accessToken);
      config.headers.Authorization = `Bearer ${parsedToken}`;
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
        const refreshToken = localStorage.getItem("refreshToken") || "";
        console.log("newAccessToken1", refreshToken);

        // Decode the refresh token to check its expiration time
        const decodedToken = jwtDecode(refreshToken);
        if (
          decodedToken &&
          decodedToken.exp &&
          decodedToken.exp * 1000 < Date.now()
        ) {
          // If the refresh token has expired
          console.log("Refresh token has expired");
          return Promise.reject("Refresh token has expired");
        }

        const newAccessToken = await refreshAccessToken(refreshToken);
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken: string) {
  try {
    // Make a request to your server's refresh token endpoint
    const response = await axios.post(`${serverBaseUrl}/jwt/refreshToken`, {
      refreshToken: refreshToken,
    });
    // Assuming your server responds with a new access token
    const newAccessToken = response.data.accessToken;
    console.log("newAccessToken ", newAccessToken);
    // Return the new access token
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}
export { PublicApi, PrivateApi };
