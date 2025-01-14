"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
	className?: string;
}

export default function Logo({ className }: LogoProps) {
	return (
		<span
			className={cn(
				"flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background dark:bg-foreground dark:text-background",
				className
			)}
		>
			<svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect y="3" width="7" height="20" fill="currentColor" />
				<circle cx="12" cy="4" r="4" fill="#929EAD" />
				<path
					d="M8.5 23C9.48491 23 10.4602 22.8448 11.3701 22.5433C12.2801 22.2417 13.1069 21.7998 13.8033 21.2426C14.4997 20.6855 15.0522 20.0241 15.4291 19.2961C15.806 18.5681 16 17.7879 16 17C16 16.2121 15.806 15.4319 15.4291 14.7039C15.0522 13.9759 14.4997 13.3145 13.8033 12.7574C13.1069 12.2002 12.2801 11.7583 11.3701 11.4567C10.4602 11.1552 9.48491 11 8.5 11L8.5 17L8.5 23Z"
					fill="currentColor"
				/>
			</svg>
		</span>
	);
}
