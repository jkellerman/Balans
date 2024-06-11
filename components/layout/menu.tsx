"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Links, MobileMenuLinks } from "@/constants/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import clsx from "clsx";

import Icons from "../icons";
import Logo from "../logo";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Menu() {
	const isSmallerScreen = useMediaQuery("(max-width: 768px)");
	return (
		<>
			{isSmallerScreen && (
				<Sheet>
					<SheetTrigger asChild>
						<button className="rounded-md border border-foreground p-2">
							<span aria-hidden="true">
								<Icons icon="Hamburger" className="h-5 w-5" />
							</span>
							<span className="sr-only">Main menu (opens dialog)</span>
						</button>
					</SheetTrigger>
					<SheetContent className="rounded-r-xl bg-primary px-0 pt-6">
						<SheetClose className="text-quinary" />
						<div>
							<div aria-hidden="true" className="pl-5">
								<Logo />
							</div>
							<NavItems />
							<Separator decorative />
							<MenuLinks />
						</div>
					</SheetContent>
				</Sheet>
			)}
		</>
	);
}

const NavItems = () => {
	const pathname = usePathname();

	return (
		<nav className="mt-6">
			<ul>
				{Links.map((link, i) => (
					<li
						key={i}
						className={clsx("rounded-r-full px-7 py-3 font-bold", {
							"text-quinary": pathname !== link.href,
							"bg-quinary text-white": pathname === link.href,
						})}
					>
						<Link href={link.href}>{link.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

const MenuLinks = () => {
	return (
		<ul>
			{MobileMenuLinks.map((link, i) => (
				<li key={i} className="px-7 py-3">
					<Link href={link.href} className="font-bold text-quinary">
						{link.name}
					</Link>
				</li>
			))}
		</ul>
	);
};
