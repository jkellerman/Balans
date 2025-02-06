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
			<svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect y="4" width="7" height="20" fill="currentColor" />
				<path
					d="M8.5 24C9.48491 24 10.4602 23.8448 11.3701 23.5433C12.2801 23.2417 13.1069 22.7998 13.8033 22.2426C14.4997 21.6855 15.0522 21.0241 15.4291 20.2961C15.806 19.5681 16 18.7879 16 18C16 17.2121 15.806 16.4319 15.4291 15.7039C15.0522 14.9759 14.4997 14.3145 13.8033 13.7574C13.1069 13.2002 12.2801 12.7583 11.3701 12.4567C10.4602 12.1552 9.48491 12 8.5 12L8.5 18L8.5 24Z"
					fill="currentColor"
				/>
				<path
					d="M9.03404 10.992C9.88301 10.9033 10.7102 10.6869 11.4685 10.3551C12.2267 10.0232 12.9011 9.58247 13.4532 9.05798C14.0053 8.5335 14.4242 7.93554 14.6861 7.29826C14.948 6.66098 15.0476 5.99685 14.9794 5.34379C14.9112 4.69074 14.6764 4.06154 14.2885 3.49213C13.9006 2.92272 13.3672 2.42425 12.7186 2.02518C12.0701 1.6261 11.3191 1.33424 10.5087 1.16626C9.6982 0.998276 8.84411 0.957459 7.99513 1.04614L8.51459 6.01908L9.03404 10.992Z"
					fill="#929EAD"
				/>
			</svg>
		</span>
	);
}
