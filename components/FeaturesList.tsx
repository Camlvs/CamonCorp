'use client';
import { useState } from 'react';
import { cn } from "@/lib/utils";
import Image from "next/image";


// Interface pour les props du composant
interface FeaturesListProps {
	features: string[];
	index: number;
}

export default function FeaturesList({ features, index }: FeaturesListProps) {
	const [showAll, setShowAll] = useState(false);
	const maxVisibleFeatures = 8;

	const visibleFeatures = showAll ? features : features.slice(0, maxVisibleFeatures);
	const hasMoreFeatures = features.length > maxVisibleFeatures;

	return (
		<div>
			<ul className="mt-4 space-y-4">
				{visibleFeatures.map((feature, featureIndex) => (
					<li
						key={featureIndex}
						className={cn(
							"flex items-center gap-2 transition-colors duration-300",
							index === 1
								? "text-black/80"
								: "text-white group-hover:text-black/80"
						)}
					>
						<Image
							src={index === 1 ? "checkWhite.svg" : "checkDark.svg"}
							width={16}
							height={16}
							alt="check"
							className="group-hover:hidden"
						/>
						<Image
							src={"checkWhite.svg"}
							width={16}
							height={16}
							alt="check"
							className={cn(
								"hidden group-hover:inline",
								index === 1 && "hidden"
							)}
						/>
						{feature}
					</li>
				))}
			</ul>

			{hasMoreFeatures && (
				<button
					onClick={() => setShowAll(!showAll)}
					className={cn(
						"mt-4 text-sm font-medium underline transition-colors duration-300 hover:opacity-80",
						index === 1
							? "text-[#E50C00]"
							: "text-white group-hover:text-[#E50C00]"
					)}
				>
					{showAll ? '− Voir moins' : `+ Voir plus (${features.length - maxVisibleFeatures} de plus)`}
				</button>
			)}
		</div>
	);
};