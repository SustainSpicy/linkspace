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
    // const dispatch = useDispatch();
    const { response } = error;

    if (response && response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken") || "";
        // Decode the refresh token to check its expiration time
        const decodedToken = jwtDecode(refreshToken);

        if (
          decodedToken &&
          decodedToken.exp &&
          decodedToken.exp * 1000 < Date.now()
        ) {
          // If the refresh token has expired
          console.log("Refresh token has expired");
          // localStorage.removeItem("user");
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("refreshToken");
          // return Promise.reject("Refresh token has expired");
        }

        const parsedToken = JSON.parse(refreshToken);

        const newAccessToken = await refreshAccessToken(parsedToken);

        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError: any) {
        if (
          refreshError &&
          refreshError.response &&
          refreshError.response.status === 403
        ) {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
        console.log("Error refreshing access token:", refreshError);
      }
    }
    console.log("response,", response);

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
