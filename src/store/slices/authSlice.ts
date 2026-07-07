import { createSlice } from "@reduxjs/toolkit";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const initialState = {
	token: sessionStorage.getItem("token") || "",
	isAuthenticated: !!sessionStorage.getItem("token"),
	URL,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			state.isAuthenticated = !!action.payload;
			sessionStorage.setItem("token", action.payload);
		},
		logout: (state) => {
			state.token = "";
			state.isAuthenticated = false;
			sessionStorage.removeItem("token");
		},
	},
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
