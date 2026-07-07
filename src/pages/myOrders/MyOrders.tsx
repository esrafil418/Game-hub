import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";
import { assets } from "../../assets/assets";

type OrderItem = {
	name: string;
	quantity: number;
};

type Order = {
	items: OrderItem[];
	amount: number;
	status: string;
	item: any[];
	_id: string;
};

export default function MyOrders() {
	// Get data from Redux store
	const URL = useAppSelector((state) => state.auth.URL);
	const token = useAppSelector((state) => state.auth.token);

	const [data, setData] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchOrders = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.post(
				URL + "/api/orders/userorders",
				{},
				{ headers: { token } },
			);
			setData(response.data.data);
		} catch (error) {
			console.error("Error fetching orders:", error);
			setError("Failed to load orders. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token) {
			fetchOrders();
		} else {
			setLoading(false);
		}
	}, [token]);

	// Show loading state
	if (loading) {
		return (
			<div className="min-h-[60vh] grid place-items-center">
				<div className="w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
				<p className="text-red-500 text-lg">{error}</p>
				<button
					type="button"
					onClick={fetchOrders}
					className="px-6 py-2 bg-teal-300 hover:bg-teal-500 text-white rounded-md transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}

	// Show empty state
	if (data.length === 0) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
				<img
					src={assets.parcel_icon}
					alt="No orders"
					className="w-20 h-20 opacity-50"
				/>
				<p className="text-[#808080] text-lg font-medium">No orders yet</p>
				<p className="text-[#a9a9a9] text-sm">Your orders will appear here</p>
			</div>
		);
	}

	return (
		<div className="w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-6 md:ml-[max(5vw,25px)] mt-10 md:mt-12.5">
			<h2 className="text-[#262626] text-2xl font-semibold mb-6">My Orders</h2>

			<div className="flex flex-col gap-4">
				{data.map((order, index) => (
					<div
						key={index}
						className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr_1fr_0.5fr] items-center gap-4 p-4 sm:px-6 sm:py-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white"
					>
						{/* Parcel Icon */}
						<img
							src={assets.parcel_icon}
							alt="parcel"
							className="w-12 h-12 object-contain"
						/>

						{/* Items List */}
						<p className="text-[#262626] text-sm sm:text-base">
							{order.items.map((item, idx) => (
								<span key={order._id + idx}>
									{item.name} x {item.quantity}
									{idx < order.items.length - 1 && ", "}
								</span>
							))}
						</p>

						{/* Amount */}
						<p className="text-tomato font-semibold text-lg">
							${order.amount}.00
						</p>

						{/* Items Count */}
						<p className="text-[#676767] text-sm">
							Items: {order.items.length}
						</p>

						{/* Status */}
						<div className="flex items-center gap-2">
							<span className="text-green-500 text-xl">●</span>
							<b className="text-[#262626] text-sm sm:text-base">
								{order.status}
							</b>
						</div>

						<p className="text-sm text-gray-400 italic">Tracking coming soon</p>
					</div>
				))}
			</div>
		</div>
	);
}
