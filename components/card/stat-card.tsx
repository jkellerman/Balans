import { formatCurrency } from "@/lib/formatter";
import { Icons as IconsType } from "@/types";

import Icons from "../icons";
import { Card } from "../ui/card";

interface CardProps {
	heading: string;
	icon: IconsType;
	value: number;
	isCurrency?: boolean;
}

export default function StatCard({ heading, icon, value, isCurrency }: CardProps) {
	const displayValue = isCurrency ? formatCurrency(value) : value;
	return (
		<Card className="flex items-center gap-4 px-6 py-5">
			<div className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-senary/40 text-septenary dark:bg-senary dark:text-secondary">
				<Icons icon={icon} className="h-4 w-4" />
			</div>
			<div>
				<h2 className="truncate text-sm capitalize text-quinary/60 dark:text-septenary">{heading}</h2>
				<span className="text-xl font-bold">{displayValue}</span>
			</div>
		</Card>
	);
}
