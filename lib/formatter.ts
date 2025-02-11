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

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
};

export const formatCurrencyShort = (amount: number) => {
	if (amount >= 1_000_000) {
		return `£${(amount / 1_000_000).toFixed(2)}m`;
	} else if (amount >= 10_000) {
		return `£${(amount / 1_000).toFixed(1)}k`;
	} else {
		return `£${amount.toFixed(2)}`;
	}
};
