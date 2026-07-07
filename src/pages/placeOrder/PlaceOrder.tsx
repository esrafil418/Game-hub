import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTotalCartAmount } from "../../store/slices/cartSlice";
import { fetchGames } from "../../store/slices/gameSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Data = {
	firstName: string;
	lastName: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zipcode: string;
	country: string;
	phone: string;
};

export default function PlaceOrder() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// Get data from Redux store
	const token = useAppSelector((state) => state.auth.token);
	const URL = useAppSelector((state) => state.auth.URL);
	const game_list = useAppSelector((state) => state.games.list);
	const gamesStatus = useAppSelector((state) => state.games.status);
	const cartItems = useAppSelector((state) => state.cart.items);
	const totalCartAmount = useAppSelector(selectTotalCartAmount);

	const [data, setData] = useState<Data>({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipcode: "",
		country: "",
		phone: "",
	});
	const [submitting, setSubmitting] = useState(false);
	const [isStoreLoaded, setIsStoreLoaded] = useState(false);

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;
		setSubmitting(true);
		try {
			const orderItems: Array<{
				_id: string | number;
				quantity: number;
				[key: string]: string | number | boolean | undefined;
			}> = [];
			game_list.forEach((item) => {
				if (cartItems[item._id] > 0) {
					const itemInfo = { ...item, quantity: cartItems[item._id] };
					orderItems.push(itemInfo);
				}
			});
			const orderData = {
				address: data,
				items: orderItems,
				amount: totalCartAmount + 2,
			};
			const response = await axios.post(URL + "/api/order/place", orderData, {
				headers: { token },
			});
			if (response.data.success) {
				const { session_url } = response.data;
				window.location.replace(session_url);
			} else {
				alert("Error placing order. Please try again.");
			}
		} catch {
			alert("Unable to place order. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	// Load games if not loaded
	useEffect(() => {
		if (gamesStatus === "idle") {
			dispatch(fetchGames());
		}
	}, [dispatch, gamesStatus]);

	// Check if games are loaded
	useEffect(() => {
		if (game_list.length > 0) {
			setIsStoreLoaded(true);
		}
	}, [game_list]);

	// Redirect if not authenticated or cart is empty
	useEffect(() => {
		if (!isStoreLoaded) {
			return;
		}

		if (!token) {
			navigate("/cart");
		} else if (totalCartAmount === 0) {
			navigate("/cart");
		}
	}, [token, isStoreLoaded, totalCartAmount, navigate]);

	// Show loading while games load
	if (gamesStatus === "loading") {
		return (
			<div className="min-h-[60vh] grid place-items-center">
				<div className="w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	// Show error if games failed to load
	if (gamesStatus === "failed") {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
				<p className="text-red-500 text-lg">
					Failed to load game data. Please refresh the page.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={placeOrder}
			className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-3.5 mt-20 md:mt-25 px-4 md:px-6 lg:px-8"
		>
			{/* Left - Delivery Information */}
			<div className="w-full lg:w-auto lg:max-w-[max(30%,500px)] flex-1">
				<p className="text-2xl md:text-3xl font-semibold mb-6 md:mb-12.5">
					Delivery Information
				</p>

				{/* First & Last Name - side by side on desktop */}
				<div className="flex flex-col sm:flex-row gap-2.5 mb-0">
					<div className="flex-1">
						<input
							required
							name="firstName"
							onChange={onChangeHandler}
							value={data.firstName}
							type="text"
							placeholder="First Name"
							className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 sm:mb-12.5"
						/>
					</div>
					<div className="flex-1">
						<input
							required
							name="lastName"
							onChange={onChangeHandler}
							value={data.lastName}
							type="text"
							placeholder="Last Name"
							className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 sm:mb-12.5"
						/>
					</div>
				</div>

				{/* Email & Street */}
				<input
					required
					name="email"
					onChange={onChangeHandler}
					value={data.email}
					type="email"
					placeholder="Email Address"
					className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 md:mb-12.5"
				/>
				<input
					required
					name="street"
					onChange={onChangeHandler}
					value={data.street}
					type="text"
					placeholder="Street"
					className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 md:mb-12.5"
				/>

				{/* City & State - side by side */}
				<div className="flex flex-col sm:flex-row gap-2.5">
					<div className="flex-1">
						<input
							required
							name="city"
							onChange={onChangeHandler}
							value={data.city}
							type="text"
							placeholder="City"
							className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 sm:mb-12.5"
						/>
					</div>
					<div className="flex-1">
						<input
							required
							name="state"
							onChange={onChangeHandler}
							value={data.state}
							type="text"
							placeholder="State"
							className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 sm:mb-12.5"
						/>
					</div>
				</div>

				{/* Zip Code & Country - side by side */}
				<div className="flex flex-col sm:flex-row gap-2.5">
					<div className="flex-1">
						<input
							required
							name="zipcode"
							onChange={onChangeHandler}
							value={data.zipcode}
							type="text"
							placeholder="Zip Code"
							className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 sm:mb-12.5"
						/>
					</div>
					<div className="flex-1">
						<input
							required
							name="country"
							onChange={onChangeHandler}
							value={data.country}
							type="text"
							placeholder="Country"
							className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-3 sm:mb-12.5"
						/>
					</div>
				</div>

				{/* Phone */}
				<input
					required
					name="phone"
					onChange={onChangeHandler}
					value={data.phone}
					type="text"
					placeholder="Phone"
					className="w-full p-2.5 border border-[#c5c5c5] rounded-sm outline-turquoise focus:ring-2 focus:ring-turquoise/20 focus:border-turquoise transition-colors duration-200 mb-4 md:mb-0"
				/>
			</div>

			{/* Right - Cart Total */}
			<div className="w-full lg:w-auto lg:min-w-75">
				<div className="cart mt-0 md:mt-0">
					<div className="flex flex-col gap-5">
						<p className="text-xl md:text-2xl font-bold">Cart Total</p>
						<div>
							<div className="flex justify-between text-gray-600">
								<p>Subtotal</p>
								<p>${totalCartAmount}</p>
							</div>
							<hr className="my-2.5" />
							<div className="flex justify-between text-gray-600">
								<p>Delivery Fee</p>
								<p>${totalCartAmount === 0 ? 0 : 2}</p>
							</div>
							<hr className="my-2.5" />
							<div className="flex justify-between text-gray-600">
								<p className="font-bold">Total</p>
								<p>${totalCartAmount === 0 ? 0 : totalCartAmount + 2}</p>
							</div>
						</div>
						<button
							type="submit"
							disabled={submitting}
							className="border-none text-white bg-turquoise w-full md:w-full py-3 rounded-sm cursor-pointer bg-teal-300 hover:bg-teal-500 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{submitting ? "Processing..." : "Proceed to Payment"}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
