import { Interval, Month } from "@/types/data";

export const calculateNextPaymentDate = (firstPaymentDate: Date, interval: Interval): Date => {
	let nextPaymentDate = new Date(firstPaymentDate);
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Normalize time to prevent mismatches

	while (nextPaymentDate <= today) {
		if (interval === "monthly") {
			nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
		} else if (interval === "weekly") {
			nextPaymentDate.setDate(nextPaymentDate.getDate() + 7);
		} else if (interval === "yearly") {
			nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
		}
	}

	return nextPaymentDate;
};

export function getDateFromToday(days: number) {
	const today = new Date();
	today.setDate(today.getDate() + days);
	return today;
}

export const formatDate = (date: Date) => {
	const day = date.getDate();
	const suffix = (day: number) => {
		if (day > 3 && day < 21) return "th";
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	const formattedDate = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);

	return `${day}${suffix(day)} ${formattedDate.split(" ")[1]} ${formattedDate.split(" ")[2]}`;
};

// Function to format the date and get the month name ('Jan', 'Feb', etc.)
export const formatDateToMonth = (date: Date): string => {
	const months: Month[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[date.getMonth()];
};
