import { RecurringPayment, Transaction } from "@/types/data";
import { type ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateRecurringTransactions = (recurringPayments: RecurringPayment[]): Transaction[] => {
	const transactions: Transaction[] = [];
	const today = new Date();

	recurringPayments.forEach((payment) => {
		if (!payment.active) return;

		const firstPaymentDate = new Date(payment.firstPaymentDate);
		const paymentDay = firstPaymentDate.getDate();
		let currentDate = new Date(firstPaymentDate);

		while (currentDate <= today) {
			transactions.push({
				id: nanoid(),
				type: "expense",
				name: payment.name,
				amount: payment.amount,
				category: payment.category,
				date: new Date(currentDate),
			});

			currentDate.setMonth(currentDate.getMonth() + 1);
			currentDate.setDate(paymentDay);
		}
	});

	return transactions;
};
