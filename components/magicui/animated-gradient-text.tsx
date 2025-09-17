import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export interface AnimatedGradientTextProps
	extends ComponentPropsWithoutRef<"div"> {
	colorFrom?: string;
	colorTo?: string;
}

export function AnimatedGradientText({
																			 children,
																			 className,
																			 colorFrom = "#ECD6B1",
																			 colorTo = "#E50C00",
																			 ...props
																		 }: AnimatedGradientTextProps) {
	return (
		<span
			style={
				{
					"--color-from": colorFrom,
					"--color-to": colorTo,
				} as React.CSSProperties
			}
			className={cn(
				`block w-full bg-gradient-to-r from-[var(--color-from)] to-[var(--color-to)] bg-clip-text text-transparent`,
				className
			)}
			{...props}
		>
      {children}
    </span>
	);
}