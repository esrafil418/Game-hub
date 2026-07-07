import { category } from "../../assets/assets";

type ExploreCategoryProps = {
	genre: string;
	setGenre: React.Dispatch<React.SetStateAction<string>>;
};

export default function ExploreCategory({
	genre,
	setGenre,
}: ExploreCategoryProps) {
	return (
		<div className="flex flex-col gap-4 md:gap-5" id="explore-category">
			<h1 className="text-[#262626] font-medium text-2xl md:text-3xl lg:text-4xl">
				Explore Categories
			</h1>

			<p className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] text-[#808080] text-sm sm:text-base md:text-lg leading-relaxed">
				Discover amazing games across all genres. Click on any category to find
				your next favorite game today!
			</p>

			<div className="flex justify-start sm:justify-between items-center gap-4 sm:gap-6 md:gap-7.5 text-center my-5 overflow-x-scroll scrollbar-hide px-4 -mx-4 pb-4">
				{category.map((item) => (
					<button
						type="button"
						key={item.category_id}
						onClick={() =>
							setGenre((prev) =>
								prev === item.category_name ? "All" : item.category_name,
							)
						}
						className="mt-3 flex flex-col items-center gap-2 shrink-0 w-24 sm:w-28 md:w-32 lg:w-36 transition-transform duration-200 hover:scale-105"
					>
						<div className="w-full aspect-square rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
							<img
								className={`w-full h-full object-cover cursor-pointer transition duration-200 hover:scale-110 rounded-full ${
									genre === item.category_name
										? "outline outline-4 outline-sky-300 outline-offset-2"
										: ""
								}`}
								src={item.category_image}
								alt={item.category_name}
							/>
						</div>
						<p className="text-[#747474] text-sm sm:text-base md:text-[max(1.2vw,14px)] lg:text-[max(1.4vw,16px)] cursor-pointer hover:text-[#49557e] transition-colors duration-200 font-medium">
							{item.category_name}
						</p>
					</button>
				))}
			</div>

			<hr className="my-4 h-0.5 bg-gray-200 border-none" />
		</div>
	);
}
