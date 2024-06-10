import { Types } from "@/types";

type Link = {
	name: string;
	href: string;
	icon?: Types.Icons;
};

export const Links: Link[] = [
	{ name: "Home", href: "/dashboard", icon: "Home" },
	{ name: "Income", href: "/dashboard/income", icon: "Income" },
	{ name: "Expenses", href: "/dashboard/expenses", icon: "Expenses" },
	{ name: "Transactions", href: "/dashboard/transactions", icon: "Transactions" },
	{ name: "Investments", href: "/dashboard/investments", icon: "Investments" },
	{ name: "Subscriptions", href: "/dashboard/subscriptions", icon: "Subscriptions" },
	{ name: "Spaces", href: "/dashboard/spaces", icon: "Spaces" },
];

export const SettingsLinks: Link[] = [
	{ name: "Help", href: "mailto:joshkellerman9@gmail.com", icon: "Help" },
	{ name: "Settings", href: "/settings", icon: "Settings" },
];

export const MobileMenuLinks: Link[] = [
	{ name: "Help", href: "mailto:joshkellerman9@gmail.com" },
	{ name: "Settings", href: "/settings" },
	{ name: "Logout", href: "/" },
];
