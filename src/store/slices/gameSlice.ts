import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { GameItemProps } from "../../components/game-item/GameItem";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const fetchGames = createAsyncThunk<GameItemProps[], void>(
	"games/fetchGames",
	async () => {
		const response = await axios.get(URL + "/api/game/list");
		return response.data.data.map(
			(game: {
				_id: number;
				name: string;
				price: number;
				description: string;
				image: string;
				category: string;
			}) => ({
				_id: game._id,
				name: game.name,
				price: game.price,
				description: game.description,
				image: game.image,
				category: game.category,
			}),
		);
	},
);

const gameSlice = createSlice({
	name: "games",
	initialState: {
		list: [] as GameItemProps[],
		status: "idle" as "idle" | "loading" | "succeeded" | "failed",
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
