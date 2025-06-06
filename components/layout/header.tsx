"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { formatDate } from "@/lib/date";
import { getGreeting } from "@/lib/formatter";
import { useTheme } from "next-themes";

import Icons from "../icons";
import Logo from "../logo";
import { themes } from "../theme";
import Avatar from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Menu from "./menu";

export default function Header() {
	const pathname = usePathname();
	const segment = pathname.split("/");
	const { setTheme, theme: currentTheme } = useTheme();
	const today = new Date();
	const sixMonthsBefore = new Date();
	sixMonthsBefore.setMonth(today.getMonth() - 6);

	return (
		<header className="flex xl:mx-auto xl:w-full xl:max-w-[1600px]">
			<div className="flex w-full items-center">
				<div className="flex w-full flex-wrap items-center justify-between gap-y-4 px-5 py-6 md:flex-nowrap md:py-8 lg:gap-0 lg:px-8">
					<div className="flex w-full items-center justify-between md:w-auto">
						<div className="flex items-center gap-4">
							<Link href="/">
								<span aria-hidden="true" className="md:hidden">
									<Logo />
								</span>

								<span className="sr-only">Home</span>
							</Link>
							<h1 className="text-lg font-bold capitalize lg:text-xl">
								{segment[2] ? segment[2] : `${getGreeting()}, Josh!`}
							</h1>
						</div>
						<Menu />
					</div>
					{/* TODO: Create UI component for datepicker */}
					<div className="flex w-full items-center gap-4 xs:w-auto lg:gap-9">
						<div className="flex w-full items-center rounded-md bg-white text-sm shadow-sm dark:bg-senary xs:w-auto">
							<div className="flex w-3/5 items-center gap-2 border-r border-background px-4 py-3 xs:w-4/5">
								<span className="text-septenary">
									<Icons icon="Calendar" className="h-6 w-6" />
								</span>
								<span className="truncate">
									{formatDate(sixMonthsBefore)} - {formatDate(today)}
								</span>
							</div>
							<div className="flex w-2/5 items-center justify-end gap-2 pl-4 pr-2">
								<span className="truncate">Last 6 months</span>
								<span className="text-septenary">
									<Icons icon="Toggle" className="h-6 w-6" />
								</span>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="rounded-full">
									<Avatar />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuPortal>
								<DropdownMenuContent className="-translate-x-5" side="bottom">
									<DropdownMenuGroup>
										{themes.map((theme, i) => (
											<DropdownMenuCheckboxItem
												checked={theme === currentTheme}
												icon={theme}
												key={i}
												onClick={() => setTheme(`${theme}`)}
											>
												{theme}
											</DropdownMenuCheckboxItem>
										))}
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem icon="Settings">
											<Link href="settings">settings</Link>
										</DropdownMenuItem>
										<DropdownMenuItem icon="logout" disabled>
											Logout
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenuPortal>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
