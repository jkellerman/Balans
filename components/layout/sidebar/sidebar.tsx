"use client";

import Logo from "@/components/logo";

import Navigation from "./navigation";

export default function Sidebar() {
	return (
		<div className="hidden w-[120px] min-w-[120px] flex-col items-center border-r border-border py-8 transition-colors md:flex">
			<div className="mb-10">
				<Logo />
			</div>
			<Navigation />
		</div>
	);
}
