"use client";

import { Avis } from "@/sanity/lib/type";
import Image from "next/image";
import { useState } from "react";

export default function Testimonials({ data }: { data: Avis }) {
	const testimonials = data.testimonials;
	const [currentIndex, setCurrentIndex] = useState(0);

	// Si 3 témoignages ou moins, affichage centré sans carousel
	if (testimonials.length <= 3) {
		return (
			<div className="mt-12 flex w-full justify-center">
				<div className="flex gap-6 flex-wrap justify-center max-w-6xl">
					{testimonials.map((item, index: number) => (
						<div
							className="w-[320px] lg:w-[500px] bg-white rounded-2xl p-6"
							key={index}
						>
							<p className="text-black">{item.description}</p>
							<div className="flex gap-2 mt-4">
								<Image
									src={item.image}
									alt={item.title}
									width={70}
									height={70}
									className="rounded-full w-[70px] h-[70px] object-cover"
								/>
								<div className="text-black flex flex-col justify-between">
									<p>{item.title}</p>
									<Image
										src="fiveStars.svg"
										width={172}
										height={30}
										alt="stars"
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="mt-12 flex w-full justify-center px-4">
			<div className="w-full max-w-6xl relative">
				<div className="overflow-hidden">
					<div
						className="flex transition-transform duration-500 ease-out"
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}
					>
						{testimonials.map((item, index: number) => (
							<div key={index} className="w-full flex-shrink-0 px-4">
								<div className="w-full max-w-[500px] mx-auto bg-white rounded-2xl p-6">
									<p className="text-black">{item.description}</p>
									<div className="flex gap-2 mt-4">
										<Image
											src={item.image}
											alt={item.title}
											width={70}
											height={70}
											className="rounded-full w-[70px] h-[70px] object-cover"
										/>
										<div className="text-black flex flex-col justify-between">
											<p>{item.title}</p>
											<Image
												src="fiveStars.svg"
												width={172}
												height={30}
												alt="stars"
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Boutons de navigation */}
				<button
					onClick={goToPrevious}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
					aria-label="Précédent"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6 text-black"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>

				<button
					onClick={goToNext}
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
					aria-label="Suivant"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6 text-black"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>

				{/* Indicateurs de pagination */}
				<div className="flex justify-center gap-2 mt-6">
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-2 h-2 rounded-full transition-all ${
								index === currentIndex
									? "bg-white w-8"
									: "bg-white/50 hover:bg-white/75"
							}`}
							aria-label={`Aller au témoignage ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}