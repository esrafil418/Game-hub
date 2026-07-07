import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchGames } from "../../store/slices/gameSlice";
import { category } from "../../assets/assets";
import GameItem, { type GameItemProps } from "../game-item/GameItem";

type GamesProps = {
	genre: string;
};

export default function Games({ genre }: GamesProps) {
	const dispatch = useAppDispatch();

	// Get data from Redux store
	const game_list = useAppSelector((state) => state.games.list);
	const gamesStatus = useAppSelector((state) => state.games.status);
	const gamesError = useAppSelector((state) => state.games.error);

	// Fetch games when component mounts
	useEffect(() => {
		if (gamesStatus === "idle") {
			dispatch(fetchGames());
		}
	}, [dispatch, gamesStatus]);

	// Show loading state
	if (gamesStatus === "loading") {
		return (
			<div className="mt-7.5" id="game-display">
				<h2 className="text-2xl md:text-3xl lg:text-[max(2vw,24px)] font-semibold">
					Top Games
				</h2>
				<p className="text-gray-500">Loading games...</p>
			</div>
		);
	}

	// Show error state
	if (gamesStatus === "failed") {
		return (
			<div className="mt-7.5" id="game-display">
				<h2 className="text-2xl md:text-3xl lg:text-[max(2vw,24px)] font-semibold">
					Top Games
				</h2>
				<p className="text-red-500">Error loading games: {gamesError}</p>
			</div>
		);
	}

	// Filter games by category
	const filteredGames =
		genre === "All"
			? game_list
			: game_list.filter((item: GameItemProps) => item.category === genre);

	// Show no games message
	if (!filteredGames || filteredGames.length === 0) {
		return (
			<div className="mt-7.5" id="game-display">
				<h2 className="text-2xl md:text-3xl lg:text-[max(2vw,24px)] font-semibold">
					Top Games
				</h2>
				<p className="text-gray-500">No games available in this category</p>
			</div>
		);
	}

	return (
		<div className="mt-7.5" id="game-display">
			<h2 className="text-2xl md:text-3xl lg:text-[max(2vw,24px)] font-semibold">
				Top Games
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7.5 gap-7.5 gap-y-12.5">
				{filteredGames.map((item: GameItemProps) => (
					<GameItem
						key={item._id}
						_id={item._id}
						name={item.name}
						price={item.price}
						description={item.description}
						image={item.image}
					/>
				))}
			</div>
		</div>
	);
}
