import Link from "next/link";
import { usePathname } from "next/navigation";

import Icons from "@/components/icons";
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Links, SettingsLinks } from "@/constants/navigation";
import { Types } from "@/types";
import clsx from "clsx";

export default function Navigation() {
	return (
		<nav className="flex h-full flex-col items-center justify-between">
			<ul>
				{Links.map((link, i) => (
					<NavItem key={i} path={link.href} icon={link.icon as Types.Icons} name={link.name} />
				))}
			</ul>
			<div className="flex flex-col gap-8">
				{SettingsLinks.map((link, i) => (
					<span key={i} className="text-septenary hover:text-foreground hover:transition-colors">
						<Link href={link.href}>
							<span aria-hidden="true">
								<Icons icon={link.icon as Types.Icons} className="h-6 w-6" />
							</span>
							<span className="sr-only">{link.name}</span>
						</Link>
					</span>
				))}
			</div>
		</nav>
	);
}

interface NavItemProps {
	path: string;
	icon: Types.Icons;
	name: string;
}

const NavItem = ({ path, icon, name }: NavItemProps) => {
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
							<span aria-hidden="true">
								<Icons icon={icon} className="h-6 w-6" />
							</span>
							<span className="sr-only">{path}</span>
						</Link>
					</li>
				</TooltipTrigger>
				<TooltipPortal>
					<TooltipContent
						side="right"
						sideOffset={10}
						className="animate-enter-l rounded-md bg-foreground px-4 py-1 font-bold text-background"
					>
						{name}
					</TooltipContent>
				</TooltipPortal>
			</Tooltip>
		</TooltipProvider>
	);
};
