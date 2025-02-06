"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { upcomingPayments } from "@/mocks/data";

export default function UpcomingPayments() {
	const isSmallerScreen = useMediaQuery("(max-width: 1280px)");

	const payments = isSmallerScreen ? upcomingPayments.slice(0, 2) : upcomingPayments;

	return (
		<ul className="xl:mb-6">
			{payments.map((payment, i) => (
				<li key={i} className="mb-4 flex items-center justify-between xl:mb-2">
					<div className="flex flex-col">
						<span className="font-bold">{payment.name}</span>
						<span className="text-sm text-quinary/60 dark:text-septenary">{payment.date}</span>
					</div>
					<span className="font-bold">£{payment.cost}</span>
				</li>
			))}
		</ul>
	);
}
