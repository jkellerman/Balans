import Link from "next/link";
import { usePathname } from "next/navigation";

import Icons from "@/components/icons";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Types } from "@/types";
import clsx from "clsx";

const Links = [
	{ name: "Home", href: "/dashboard", icon: "Home" as const },
	{ name: "Income", href: "/dashboard/income", icon: "Income" as const },
	{ name: "Expenses", href: "/dashboard/expenses", icon: "Expenses" as const },
	{ name: "Transactions", href: "/dashboard/transactions", icon: "Transactions" as const },
	{ name: "Investments", href: "/dashboard/investments", icon: "Investments" as const },
	{ name: "Subscriptions", href: "/dashboard/subscriptions", icon: "Subscriptions" as const },
	{ name: "Spaces", href: "/dashboard/spaces", icon: "Spaces" as const },
];

export default function Navigation() {
	return (
		<nav className="flex h-full flex-col items-center justify-between">
			<ul>
				{Links.map((link, i) => (
					<NavItem key={i} path={link.href} icon={link.icon} name={link.name} />
				))}
			</ul>
			<div className="flex flex-col gap-8">
				<span className="text-septenary hover:text-foreground hover:transition-colors">
					<Link href="mailto:joshkellerman9@gmail.com">
						<Icons icon="Help" className="h-6 w-6" />
						<span className="sr-only">settings</span>
					</Link>
				</span>
				<span className="text-septenary hover:text-foreground hover:transition-colors">
					<Link href="/settings">
						<Icons icon="Settings" className="h-6 w-6" />
						<span className="sr-only">settings</span>
					</Link>
				</span>
			</div>
		</nav>
	);
}

interface NavItemProps {
	path: string;
	icon: Types.Icons;
	name: string;
}

export const NavItem = ({ path, icon, name }: NavItemProps) => {
	const pathname = usePathname();

	return (
		<TooltipProvider>
			<Tooltip delayDuration={150}>
				<TooltipTrigger asChild>
					<li
						className={clsx(`mb-4 rounded-md`, {
							"text-septenary hover:bg-senary hover:transition-colors hover:duration-300": pathname !== path,
							"bg-primary text-quinary": pathname === path,
						})}
					>
						<Link
							href={path}
							className="relative flex items-center justify-center px-4 py-2 after:absolute after:h-full after:w-full after:content-['']"
						>
							<Icons icon={icon} className="h-6 w-6" />
							<span className="sr-only">{path}</span>
						</Link>
					</li>
				</TooltipTrigger>
				<TooltipPortal>
					<TooltipContent
						side="right"
						sideOffset={10}
						className="animate-enter-l rounded-md bg-foreground px-4 py-1 text-background"
					>
						{name}
					</TooltipContent>
				</TooltipPortal>
			</Tooltip>
		</TooltipProvider>
	);
};
