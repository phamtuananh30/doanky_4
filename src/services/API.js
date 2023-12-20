// call api
import Cookies from "universal-cookie";
import { apiConfig } from "../configs/apiConfig.js";
const { SERVER_AUTH_API } = apiConfig;
import axios from "axios";
import queryString from "query-string";
import { saveProfileToLS } from "../utils/localStorage.js";

const axiosClient = axios.create(
  (() => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return {
      baseURL: SERVER_AUTH_API,
      headers,
    };
  })()
);

axiosClient.interceptors.request.use(function (config) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  config.headers["Authorization"] = "Bearer " + token;

  return config;
});
axiosClient.interceptors.response.use((response) => {
  const { url } = response.config;
  if (url === "auth/login" || url === "auth/register") {
    console.log(response, "response");
    const cookies = new Cookies();
    cookies.set("token", response.data.data.jwtToken, {
      expires: new Date(response.data.data.expiresIn),
      path: "/",
    });

    // saveProfileToLS((response.data as AuthResponse).data.user)
  } else if (url === "auth/logout") {
    // removeAccessTokenAndProfileFromLS()
  }
  return response;
});

function buildUrl(baseUrl, params) {
  const query = queryString.stringify(params);
  const url = `${baseUrl}?${query}`;
  return url;
}

export const apiClient = {
  get: async (url, requestParam = null) => {
    if (requestParam) {
      url = buildUrl(url, requestParam);
    }
    const response = await axiosClient.get(url);
    return response.data;
  },

  post: async (url, body = {}) => {
    const response = await axiosClient.post(url, body);
    return response.data;
  },

  patch: async (url, body = {}) => {
    const response = await axiosClient.patch(url, body);
    return response.data;
  },

  put: async (url, body = {}) => {
    const response = await axiosClient.put(url, body);
    return response.data;
  },

  delete: async (url) => {
    const response = await axiosClient.delete(url);
    return response.data;
  },
};
