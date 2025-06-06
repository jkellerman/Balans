"use client";

import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDate } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import { data } from "@/mocks/data";
import { RecurringPayment } from "@/types/accountData";

import Fallback from "./no-data-fallback";

export default function UpcomingPayments() {
	const isSmallerScreen = useMediaQuery("(max-width: 1280px)");

	const getUpcomingPayments = (recurringPayments: RecurringPayment[]) => {
		const today = new Date();

		// Convert recurringPayments data into an array of payments with upcoming dates
		const upcomingPayments = recurringPayments
			.map((payment) => {
				// Clone the firstPaymentDate to avoid modifying the original data
				const firstPaymentDate = new Date(payment.firstPaymentDate);

				// If the first payment date is before today, calculate the next payment date
				let nextPaymentDate = new Date(firstPaymentDate);

				// Calculate next payment date: it repeats monthly
				while (nextPaymentDate <= today) {
					nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
				}

				// If the next payment date is the same day as today, move it to the next month
				if (nextPaymentDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)) {
					nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
				}

				return {
					name: payment.name,
					amount: payment.amount,
					nextPaymentDate: nextPaymentDate,
				};
			})
			.filter((payment) => payment.nextPaymentDate >= today)
			.sort((a, b) => a.nextPaymentDate.getTime() - b.nextPaymentDate.getTime());

		return upcomingPayments;
	};

	const upcomingPayments = getUpcomingPayments(data.recurringPayments);

	const payments = isSmallerScreen ? upcomingPayments.slice(0, 2) : upcomingPayments.slice(0, 3);

	return (
		<div className="flex h-full items-center justify-center">
			{payments && payments.length ? (
				<ul className="w-full xl:mb-5">
					{payments.map((payment, i) => (
						<li key={i} className="mb-4 flex items-center justify-between xl:mb-2">
							<div className="flex flex-col">
								<span className="font-bold">{payment.name}</span>
								<span className="text-sm text-quinary/60 dark:text-septenary">
									{formatDate(payment.nextPaymentDate)}
								</span>
							</div>
							<span className="font-bold">{formatCurrency(payment.amount)}</span>
						</li>
					))}
				</ul>
			) : (
				<Fallback />
			)}
		</div>
	);
}
