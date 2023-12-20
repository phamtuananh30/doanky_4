import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  FULFILLED,
  IDLE,
  PENDING,
  REJECTED,
} from "../../constants/apiStatus.js";
import { apiClient } from "../../services/API.js";
import { setLocalStorage } from "../../utils/localStorage.js";
import Cookies from "universal-cookie";

const initialState = {
  userInfo: {},
  userToken: {},
  error: null,
  status: IDLE,
};

export const authLogin = createAsyncThunk(
  "auth/login",
  async (body, thunkApi) => {
    try {
      const response = await apiClient.post("auth/login", body);
      const jwtToken = response.data.jwtToken;
      if (jwtToken) {
        const cookies = new Cookies();
        return response.data;
      }
    } catch (e) {
      return thunkApi.rejectWithValue({
        code: e.response.status,
        message: e.response.data.errors,
      });
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/info",
  async (body, thunkApi) => {
    try {
      const response = await apiClient.get("user/info", null);
      const userInfo = response.data;
      if (userInfo) {
        return userInfo;
      }
    } catch (e) {
      return thunkApi.rejectWithValue({
        code: e.response.status,
        message: e.response.data.errors,
      });
    }
  }
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (body, thunkApi) => {
    try {
      return await apiClient.post("auth/register", body);
    } catch (e) {
      return thunkApi.rejectWithValue({
        code: e.response.status,
        message: e.response.data.errors,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = IDLE;
    },
    logout: () => {
      const cookies = new Cookies();
      cookies.remove("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = FULFILLED;
        console.log(action.payload);
        state.userToken = action.payload;
        state.error = null;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      })
      .addCase(authRegister.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.status = FULFILLED;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = FULFILLED;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = REJECTED;
        state.error = action.payload;
      });
  },
});
