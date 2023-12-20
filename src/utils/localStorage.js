const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
const setObjectLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};
const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};
const getObjectLocalstorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeLocalStorage = (...keys) => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const saveProfileToLS = (profile) => {
  localStorage.setItem("user", JSON.stringify(profile));
};
export const getProfileFromLS = () => {
  const result = localStorage.getItem("user");
  return result ? JSON.parse(result) : null;
};
import Cookies from "universal-cookie";
export const getAccessTokenFromCookies = () => {
  const cookies = new Cookies();
  return cookies.get("token");
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setObjectLocalStorage,
};
