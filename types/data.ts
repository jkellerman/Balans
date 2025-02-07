export interface FinancialEntity {
	id: number;
	name: string;
	amount: number;
	category: string;
	date: Date;
}

export interface Transaction extends FinancialEntity {
	type: "income" | "expense";
}

export interface Data {
	transactions: Transaction[];
	subscriptions: FinancialEntity[];
	investments: FinancialEntity[];
}

export type Month = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
