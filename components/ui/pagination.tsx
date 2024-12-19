import Link from "next/link";

import * as React from "react";

import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Icons from "../icons";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn("mx-auto flex w-full justify-center", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
	({ className, ...props }, ref) => (
		<ul ref={ref} className={cn("mt-4 flex flex-row items-center gap-1", className)} {...props} />
	)
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & Pick<ButtonProps, "size"> &
	React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, isActive, size = "none", ...props }: PaginationLinkProps) => (
	<Link
		aria-current={isActive ? "page" : undefined}
		className={cn(
			buttonVariants({
				variant: isActive ? "tertiary" : "quaternary",
				size,
			}),
			"rounded-md border border-senary px-3.5 py-1.5",
			className
		)}
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={cn("gap-1 border-none bg-senary p-2.5 hover:bg-septenary", className)}
		{...props}
	>
		<Icons icon="ChevronLeft" className="h-4 w-4" />
		<span className="sr-only">Previous</span>
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={cn("gap-1 border-none bg-senary p-2.5 hover:bg-septenary", className)}
		{...props}
	>
		<span className="sr-only">Next</span>
		<Icons icon="ChevronRight" className="h-4 w-4" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
	<span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
		<Icons icon="Ellipsis" className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
