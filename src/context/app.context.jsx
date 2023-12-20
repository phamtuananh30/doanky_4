import { createContext, useState } from "react";
import {
  getAccessTokenFromCookies,
  getProfileFromLS,
} from "../utils/localStorage";

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromCookies()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
};
export const AppContext = createContext(initialAppContext);
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState(initialAppContext.profile);
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  );
};
