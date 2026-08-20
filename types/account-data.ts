import { Interval } from "./dates";

export interface AccountData {
	transactions: Transaction[];
	recurringPayments: RecurringPayment[];
	investments: Investment[];
}

export interface FinancialEntity {
	id: string | number;
	name: string;
	amount: number;
	category: string;
	date: Date;
}

export interface Investment extends FinancialEntity {
	type: "investment";
}

export interface RecurringPayment extends Omit<FinancialEntity, "date"> {
	type: "bills" | "subscription";
	interval: Interval;
	active: boolean;
	firstPaymentDate: Date;
}

export interface Transaction extends FinancialEntity {
	type: "income" | "expense";
}
