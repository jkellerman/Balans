import Link from "next/link";

import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("rounded-md border border-border", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex items-center justify-between", className)} {...props} />
	)
);
CardHeader.displayName = "CardHeader";

const CardHeadingContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />
);
CardHeadingContainer.displayName = "CardHeadingContainer";

const CardHeading = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h2 ref={ref} className={cn("text-sm font-bold capitalize", className)} {...props} />
	)
);
CardHeading.displayName = "CardHeading";

const CardSubHeading = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
	({ className, ...props }, ref) => <span ref={ref} className={cn("text-sm text-septenary", className)} {...props} />
);
CardSubHeading.displayName = "CardSubHeading";

const CardLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
	({ className, href, children, ...props }, ref) => (
		<Link
			href={href as string}
			ref={ref}
			className={cn("flex items-center gap-1 text-[13px] capitalize text-tertiary", className)}
			{...props}
		>
			{children}
		</Link>
	)
);
CardLink.displayName = "CardLink";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => (
		<div ref={ref} className={cn(className)} {...props}>
			{children}
		</div>
	)
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardHeadingContainer, CardHeading, CardSubHeading, CardLink, CardContent };