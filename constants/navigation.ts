import { Link } from "@/types";

export const Links: Link[] = [
	{ name: "Home", href: "/dashboard", icon: "Home" },
	{ name: "Transactions", href: "/dashboard/transactions", icon: "Transactions" },
	{ name: "Investments", href: "/dashboard/investments", icon: "Investments" },
	{ name: "Recurring Payments", href: "/dashboard/recurring-payments", icon: "RecurringPayment" },
	{ name: "Spaces", href: "/dashboard/spaces", icon: "Spaces" },
	{ name: "Insights", href: "/dashboard/insights", icon: "Insights" },
];

export const SettingsLinks: Link[] = [
	{ name: "Help", href: "mailto:joshkellerman9@gmail.com", icon: "Help" },
	{ name: "Settings", href: "/settings", icon: "Settings" },
];

export const MobileMenuLinks: Link[] = [
	{ name: "Help", href: "mailto:joshkellerman9@gmail.com" },
	{ name: "Settings", href: "/settings" },
	{ name: "Logout", href: "/", disabled: true },
];
