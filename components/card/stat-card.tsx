import { Types } from "@/types";

import Icons from "../icons";
import { Card } from "../ui/card";

interface CardProps {
	heading: string;
	icon: Types.Icons;
	value: number;
}

export default function StatCard({ heading, icon, value }: CardProps) {
	return (
		<Card className="flex items-center gap-4 px-6 py-5">
			<div className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-secondary dark:bg-senary">
				<Icons icon={icon} className="h-4 w-4" />
			</div>
			<div>
				<h2 className="text-sm capitalize text-septenary">{heading}</h2>
				<span className="text-xl font-bold">£{value.toFixed(2)}</span>
			</div>
		</Card>
	);
}
