import axios from "axios";

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
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("config", config);
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
    const response = await axios.post(`${serverBaseUrl}/refreshToken`, {
      refreshToken: refreshToken,
    });
    // Assuming your server responds with a new access token
    const newAccessToken = response.data.accessToken;

    // Return the new access token
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}
export { PublicApi, PrivateApi };
