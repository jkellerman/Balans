import { Types } from "@/types";

import Icons from "./icons";

interface CardProps {
	header: string;
	icon: Types.Icons;
	value: number;
}

export default function Card({ header, icon, value }: CardProps) {
	return (
		<div className="flex items-center gap-4 rounded-md border border-border px-6 py-5">
			<div className="flex h-10 w-10 items-center justify-center rounded-full bg-senary text-secondary">
				<Icons icon={icon} className="h-4 w-4" />
			</div>
			<div>
				<h2 className="text-sm capitalize text-septenary">{header}</h2>
				<span className="text-xl font-bold">£{value.toFixed(2)}</span>
			</div>
		</div>
	);
}
