import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
	const response = await axios.get(URL + "/api/game/list");
	return response.data.data.map((game: any) => ({
		_id: game._id,
		name: game.name,
		price: game.price,
		description: game.description,
		image: game.image,
		category: game.category,
	}));
});

const gameSlice = createSlice({
	name: "games",
	initialState: {
		list: [],
		status: "idle",
		error: null as string | null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGames.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchGames.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.list = action.payload;
			})
			.addCase(fetchGames.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "An error occurred";
			});
	},
});

export default gameSlice.reducer;
