export default function Header() {
	return (
		<div className="relative h-[50vh] sm:h-[50vh] md:h-[40vw] lg:h-[34vw] my-7.5 mx-auto bg-no-repeat bg-cover bg-center header-img overflow-hidden rounded-lg">
			{/* Dark overlay for better text visibility */}
			<div className="absolute inset-0 bg-black/40 md:bg-black/30" />

			{/* Content container */}
			<div className="absolute flex flex-col items-start gap-3 sm:gap-4 md:gap-[1.5vw] max-w-[90%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[55%] top-1/2 left-[5%] sm:left-[6vw] md:left-[8vw] lg:left-[10vw] -translate-y-1/2 animate-[fadeIn_3s]">
				{/* Glassmorphism background for text */}
				<div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl bg-black/60 border border-white/20 shadow-2xl">
					<h2 className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-tight drop-shadow-lg mb-2 sm:mb-3">
						Level Up Your Gaming Experience!
					</h2>

					<p className="text-white text-sm sm:text-base md:text-lg lg:text-[1.1vw] max-w-full leading-relaxed drop-shadow-md">
						Welcome to GameHub - your ultimate destination for the latest and
						greatest video games!
					</p>

					<a
						href="`#game-display`"
						className="inline-flex mt-3 sm:mt-4 md:mt-5 text-[`#49557e`] font-semibold px-6 py-2.5 sm:px-8 sm:py-3 md:px-[2.3vw] md:py-[1vw] bg-white/95 backdrop-blur-sm text-sm sm:text-base md:text-[max(1vw,14px)] rounded-full transition-all duration-300 hover:bg-white hover:shadow-xl shadow-md active:scale-95"
					>
						Explore Games
					</a>
				</div>
			</div>
		</div>
	);
}
