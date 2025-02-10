export type Interval = "weekly" | "monthly" | "yearly";

export interface FinancialEntity {
	id: number;
	name: string;
	amount: number;
	category: string;
	date: Date;
}

export interface RecurringPayment {
	interval: Interval;
	active: boolean;
}

export interface Transaction extends FinancialEntity {
	type: "income" | "expense";
	recurring?: RecurringPayment;
}

export interface Subscription extends FinancialEntity {
	type: "subscription";
	recurring: RecurringPayment;
}

export interface Investment extends FinancialEntity {
	type: "investment";
}

export interface Data {
	transactions: Transaction[];
	subscriptions: Subscription[];
	investments: Investment[];
}

export type Month = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
