"use client";

import Link from "next/link";

import Logo from "@/components/logo";

import Navigation from "./navigation";

export default function Sidebar() {
	return (
		<div className="hidden w-[100px] min-w-[100px] flex-col items-center border-r border-border py-8 transition-colors md:flex">
			<div className="mb-10">
				<Link href="/">
					<span aria-hidden="true">
						<Logo />
					</span>

					<span className="sr-only">Home</span>
				</Link>
			</div>
			<Navigation />
		</div>
	);
}
