import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import axios from "axios";

export default function Verify() {
	const [searchParams] = useSearchParams();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");

	// Get URL from Redux store
	const URL = useAppSelector((state) => state.auth.URL);
	const navigate = useNavigate();

	const verifyPayment = async () => {
		try {
			const response = await axios.post(URL + "/api/order/verify", {
				success,
				orderId,
			});
			if (response.data.success) {
				navigate("/myorders");
				return;
			}
		} catch (error) {
			console.error("Payment verification error:", error);
			// fall through to failure navigation
		}
		navigate("/");
	};

	useEffect(() => {
		verifyPayment();
	}, []); // Empty dependency array - runs once on mount

	return (
		<div className="min-h-[60vh] grid place-items-center">
			<div className="w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
}
