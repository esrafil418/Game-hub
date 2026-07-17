import { CircleMinus, CirclePlus } from "lucide-react";
import { assets } from "../../assets/assets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
	addToCartAsync,
	addToCartLocal,
	removeFromCartAsync,
	removeFromCartLocal,
} from "../../store/slices/cartSlice";

export type GameItemProps = {
	_id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	category_id?: number;
	category?: string;
};

export default function GameItem({
	_id,
	name,
	price,
	description,
	image,
}: GameItemProps) {
	const dispatch = useAppDispatch();

	// Get data from Redux store
	const cartItems = useAppSelector((state) => state.cart.items);
	const token = useAppSelector((state) => state.auth.token);
	// const URL = useAppSelector((state) => state.auth.URL);

	const handleAddToCart = () => {
		// 1. Update local state immediately (optimistic update)
		dispatch(addToCartLocal(_id));

		// 2. If logged in, sync with backend
		if (token) {
			dispatch(addToCartAsync({ itemId: _id, token }));
		}
	};

	const handleRemoveFromCart = () => {
		// 1. Update local state immediately (optimistic update)
		dispatch(removeFromCartLocal(_id));

		// 2. If logged in, sync with backend
		if (token) {
			dispatch(removeFromCartAsync({ itemId: _id, token }));
		}
	};

	// For debugging
	console.log(`Item ${_id} - ${name}:`, {
		_id,
		cartItems: cartItems[_id],
		cartItemsObject: cartItems,
	});

	return (
		<div className="w-full mx-auto rounded-[15px] shadow-md transition duration-300 animate-[fadeIn_1s] p-2">
			<div className="relative">
				<img
					className="w-full rounded-t-[15px] rounded-b-[15px] rounded-bl-none"
					src={image}
					alt={name}
				/>
				{!cartItems[_id] ? (
					<button
						type="button"
						aria-label={`Add ${name} to cart`}
						className="absolute bottom-3.5 right-3.5 rounded-full bg-white"
						onClick={handleAddToCart}
					>
						<CirclePlus />
					</button>
				) : (
					<div className="absolute bottom-2 right-2 flex items-center gap-2.5 p-1.5 rounded-full bg-white shadow-lg hover:shadow-lg transition-shadow duration-200">
						<button
							type="button"
							aria-label={`Remove ${name} from cart`}
							onClick={handleRemoveFromCart}
						>
							<CircleMinus />
						</button>
						<p>{cartItems[_id]}</p>
						<button
							type="button"
							aria-label={`Add another ${name} to cart`}
							onClick={handleAddToCart}
						>
							<CirclePlus />
						</button>
					</div>
				)}
			</div>
			<div className="py-5">
				<div className="flex justify-between items-center mb-2.5">
					<p className="text-xl font-medium">{name}</p>
					<img
						src={assets.rating_starts}
						alt="rating_starts"
						className="w-16"
					/>
				</div>
				<p className="text-gray-500 text-xs line-clamp-2">{description}</p>
				<p className="text-red-500 text-xl font-medium my-2.5">${price}</p>
			</div>
		</div>
	);
}
