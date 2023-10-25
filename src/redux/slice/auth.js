import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { PORT_TOKEN, PORT_USER } from "../../constants";

const initialState = {
  isAuthenticated: Boolean(Cookies.get(PORT_TOKEN)),
  user: JSON.parse(localStorage.getItem(PORT_USER)),
};

const authSlices = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth(state, { payload }) {
      state.isAuthenticated = true;
      state.user = payload;
    },
    removeAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const { name, reducer: authReducer } = authSlices;
const { setAuth, removeAuth } = authSlices.actions;
export { name as authName, setAuth, removeAuth, authReducer as default };
