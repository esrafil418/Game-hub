import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

interface AddToCartArgs {
	itemId: string | number;
	token: string;
}

interface RemoveFromCartArgs {
	itemId: string | number;
	token: string;
}

export const addToCartAsync = createAsyncThunk(
	"cart/addToCart",
	async ({ itemId, token }: AddToCartArgs, { rejectWithValue }) => {
		try {
			if (token) {
				await axios.post(
					URL + "/api/cart/add",
					{ itemId },
					{ headers: { token } },
				);
			}
			return itemId;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to add item",
			);
		}
	},
);

export const removeFromCartAsync = createAsyncThunk(
	"cart/removeFromCart",
	async ({ itemId, token }: RemoveFromCartArgs, { rejectWithValue }) => {
		try {
			if (token) {
				await axios.post(
					URL + "/api/cart/remove",
					{ itemId },
					{ headers: { token } },
				);
			}
			return itemId;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to remove item",
			);
		}
	},
);

export const loadCartAsync = createAsyncThunk(
	"cart/loadCart",
	async (token: string, { rejectWithValue }) => {
		try {
			if (!token) return {};
			const response = await axios.post(
				URL + "/api/cart/get",
				{},
				{ headers: { token } },
			);
			return response.data.cartData || {};
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || "Failed to load cart",
			);
		}
	},
);

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: {} as Record<string, number>,
		status: "idle" as "idle" | "loading" | "succeeded" | "failed",
		error: null as string | null,
	},
	reducers: {
		addToCartLocal: (state, action) => {
			const itemId = action.payload;
			state.items[itemId] = (state.items[itemId] || 0) + 1;
		},
		removeFromCartLocal: (state, action) => {
			const itemId = action.payload;
			const nextQuantity = (state.items[itemId] || 0) - 1;
			if (nextQuantity <= 0) {
				delete state.items[itemId];
			} else {
				state.items[itemId] = nextQuantity;
			}
		},
		clearCart: (state) => {
			state.items = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCartAsync.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(loadCartAsync.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(loadCartAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = (action.payload as string) || "Failed to load cart";
			})
			.addCase(addToCartAsync.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(addToCartAsync.fulfilled, (state) => {
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(addToCartAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = (action.payload as string) || "Failed to add item";
			})
			.addCase(removeFromCartAsync.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(removeFromCartAsync.fulfilled, (state) => {
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(removeFromCartAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = (action.payload as string) || "Failed to remove item";
			});
	},
});

export const selectTotalCartAmount = (state: {
	cart: { items: Record<string, number> };
	games: { list: any[] };
}) => {
	const cartItems = state.cart.items;
	const gameList = state.games.list;
	let total = 0;

	for (const itemId in cartItems) {
		const game = gameList.find((g) => String(g._id) === String(itemId));
		if (game) {
			total += game.price * cartItems[itemId];
		}
	}
	return total;
};

export const selectCartItemCount = (state: {
	cart: { items: Record<string, number> };
}) => {
	return Object.values(state.cart.items).reduce((sum, qty) => sum + qty, 0);
};

export const { addToCartLocal, removeFromCartLocal, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
