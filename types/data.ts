export type Interval = "weekly" | "monthly" | "yearly";

export interface FinancialEntity {
	id: string | number;
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
}

export interface RecurringPayment extends Omit<FinancialEntity, "date"> {
	type: "bills" | "subscription";
	interval: Interval;
	active: boolean;
	firstPaymentDate: Date;
}

export interface Investment extends FinancialEntity {
	type: "investment";
}

export interface Data {
	transactions: Transaction[];
	recurringPayments: RecurringPayment[];
	investments: Investment[];
}

export type Month = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
