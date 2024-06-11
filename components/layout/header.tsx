import Link from "next/link";

import Icons from "../icons";
import Logo from "../logo";
import Avatar from "../ui/avatar";
import Menu from "./menu";

export default function Header() {
	return (
		<header className="flex">
			<div className="flex w-full items-center">
				<div className="flex w-full flex-wrap items-center justify-between gap-y-4 px-5 py-6 transition-colors md:flex-nowrap md:py-8 lg:gap-0 lg:px-8">
					<div className="flex w-full items-center justify-between md:w-auto">
						<div className="flex items-center gap-4">
							<Link href="/">
								<span aria-hidden="true" className="md:hidden">
									<Logo />
								</span>

								<span className="sr-only">Home</span>
							</Link>
							<h1 className="text-lg font-bold lg:text-xl">Good morning, Josh!</h1>
						</div>
						<Menu />
					</div>
					{/* TODO: Create UI component for datepicker */}
					<div className="flex w-full items-center gap-4 xs:w-auto lg:gap-9">
						<div className="flex w-full items-center rounded-md bg-senary text-sm xs:w-auto">
							<div className="flex w-3/5 items-center gap-2 border-r border-background px-4 py-3 xs:w-4/5">
								<span className="text-septenary">
									<Icons icon="Calendar" className="h-6 w-6" />
								</span>
								<span className="truncate">19 Jun, 2024 - 26 Jun, 2024</span>
							</div>
							<div className="flex w-2/5 items-center justify-end gap-2 pl-4 pr-2">
								<span className="truncate">Last 7 days</span>
								<span className="text-septenary">
									<Icons icon="Toggle" className="h-6 w-6" />
								</span>
							</div>
						</div>
						<Avatar />
					</div>
				</div>
			</div>
		</header>
	);
}
