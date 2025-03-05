"use client";

import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max, style, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn("h-[10px] max-w-[200px] rounded-md bg-senary", className)}
		{...props}
		value={value}
		max={max}
	>
		<ProgressPrimitive.Indicator className="transition-width h-full rounded-md bg-primary duration-500" style={style} />
	</ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
