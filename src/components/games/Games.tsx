import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchGames } from "../../store/slices/gameSlice";
import GameItem, { type GameItemProps } from "../game-item/GameItem";

type GamesProps = {
	genre: string;
};

export default function Games({ genre }: GamesProps) {
	const dispatch = useAppDispatch();

	const game_list = useAppSelector((state) => state.games.list);
	const gamesStatus = useAppSelector((state) => state.games.status);
	const gamesError = useAppSelector((state) => state.games.error);

	useEffect(() => {
		if (gamesStatus === "idle") {
			dispatch(fetchGames());
		}
	}, [dispatch, gamesStatus]);

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

	const filteredGames =
		genre === "All"
			? game_list
			: game_list.filter((item: GameItemProps) => item.category === genre);

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
				{filteredGames.map((item: GameItemProps) => {
					const imageUrl = `/uploads/${item.image}`;

					return (
						<GameItem
							key={item._id}
							_id={item._id}
							name={item.name}
							price={item.price}
							description={item.description}
							image={imageUrl}
						/>
					);
				})}
			</div>
		</div>
	);
}
