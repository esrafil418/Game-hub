import { createContext, useEffect, useState, type ReactNode } from "react";
import type { GameItemProps } from "../components/game-item/GameItem";
import axios from "axios";

export interface StoreContextType {
	game_list: GameItemProps[];
	cartItems: { [key: number]: number };
	setCartItems: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
	addToCart: (itemId: number) => void;
	removeFromCart: (itemId: number) => void;
	getTotalCartAmount: () => number;
	URL: string;
	token: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const StoreContext = createContext<StoreContextType | null>(null);

interface StoreContextProviderProps {
	children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
	const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
	const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
	const [token, setToken] = useState("");
	const [game_list, setGameList] = useState<GameItemProps[]>([]);

	const addToCart = async (itemId: number) => {
		setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }));
		if (token) {
			await axios.post(
				URL + "/api/cart/add",
				{ itemId },
				{ headers: { token } },
			);
		}
	};

	const removeFromCart = async (itemId: number) => {
		setCartItems((prev) => {
			const nextQuantity = (prev[itemId] ?? 0) - 1;
			if (nextQuantity <= 0) {
				const { [itemId]: _removed, ...rest } = prev;
				return rest;
			}
			return { ...prev, [itemId]: nextQuantity };
		});

		if (token) {
			await axios.post(
				URL + "/api/cart/remove",
				{ itemId },
				{ headers: { token } },
			);
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				const itemInfo = game_list.find(
					(product) => product._id === Number(item),
				);
				if (itemInfo) {
					totalAmount += itemInfo.price * cartItems[item];
				}
			}
		}
		return totalAmount;
	};

	const fetchGameList = async () => {
		try {
			const response = await axios.get(URL + "/api/game/list");
			const mappedGames = response.data.data.map(
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
			setGameList(mappedGames);
		} catch (error) {
			console.error("Failed to fetch games:", error);
		}
	};

	const loadCartData = async (token: string) => {
		const response = await axios.post(
			URL + "/api/cart/get",
			{},
			{ headers: { token } },
		);
		setCartItems(response.data.cartData);
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		async function loadData() {
			try {
				await fetchGameList();
				if (storedToken) {
					setToken(storedToken);
					await loadCartData(storedToken);
				}
			} catch (error) {
				console.error("Failed to initialize store context:", error);
			}
		}
		loadData();
	}, []);

	const contextValue: StoreContextType = {
		game_list,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		URL,
		token,
		setToken,
	};

	return (
		<StoreContext.Provider value={contextValue}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
