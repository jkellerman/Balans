import { Month } from "@/types/data";

export function getGreeting(): string {
	const currentHour = new Date().getHours();

	if (currentHour < 12) {
		return "Good morning";
	} else if (currentHour < 18) {
		return "Good afternoon";
	} else {
		return "Good evening";
	}
}

export function getDateFromToday(days: number) {
	const today = new Date();
	today.setDate(today.getDate() + days);
	return today;
}

// Function to format the date and get the month name ('Jan', 'Feb', etc.)
export const formatDateToMonth = (date: Date): string => {
	const months: Month[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[date.getMonth()];
};
