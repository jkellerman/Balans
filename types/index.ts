export type Icons =
	| "Calendar"
	| "Check"
	| "ChevronDown"
	| "ChevronLeft"
	| "ChevronRight"
	| "Close"
	| "dark"
	| "Edit"
	| "Ellipsis"
	| "Expenses"
	| "Hamburger"
	| "Help"
	| "Home"
	| "Income"
	| "Insights"
	| "Investments"
	| "light"
	| "logout"
	| "MagnifyingGlass"
	| "Piggy"
	| "RecurringPayment"
	| "Settings"
	| "Spaces"
	| "Subscriptions"
	| "system"
	| "Toggle"
	| "Transactions"
	| "Trash"
	| "Wallet";

export type Link = {
	name: string;
	href: string;
	icon?: Icons;
	disabled?: boolean;
};
