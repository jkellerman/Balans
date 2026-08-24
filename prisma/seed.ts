// prisma/seed.ts
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function getDateFromToday(daysOffset: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + daysOffset);
	return date;
}

async function main() {
	await prisma.transaction.deleteMany();
	await prisma.recurringPayment.deleteMany();
	await prisma.space.deleteMany();
	await prisma.category.deleteMany();
	await prisma.user.deleteMany();

	const user = await prisma.user.create({
		data: { email: "demo@balans.app", name: "Demo User" },
	});

	const categoryDefs: { name: string; type: "INCOME" | "EXPENSE" | "INVESTMENT" }[] = [
		{ name: "Salary", type: "INCOME" },
		{ name: "Side hustle", type: "INCOME" },
		{ name: "Other income", type: "INCOME" },

		{ name: "Groceries", type: "EXPENSE" },
		{ name: "Eating out", type: "EXPENSE" },
		{ name: "Takeaway", type: "EXPENSE" },
		{ name: "Coffee", type: "EXPENSE" },
		{ name: "Alcohol", type: "EXPENSE" },
		{ name: "Snacks", type: "EXPENSE" },
		{ name: "Transport", type: "EXPENSE" },
		{ name: "Fitness/Gym", type: "EXPENSE" },
		{ name: "Entertainment", type: "EXPENSE" },
		{ name: "Clothes", type: "EXPENSE" },
		{ name: "Holidays", type: "EXPENSE" },
		{ name: "Bills", type: "EXPENSE" },
		{ name: "Rent/Mortgage", type: "EXPENSE" },
		{ name: "Charity", type: "EXPENSE" },
		{ name: "Debt Repayment", type: "EXPENSE" },
		{ name: "Education", type: "EXPENSE" },
		{ name: "Insurance", type: "EXPENSE" },
		{ name: "Medical", type: "EXPENSE" },
		{ name: "Pets", type: "EXPENSE" },
		{ name: "Gifts", type: "EXPENSE" },
		{ name: "Subscriptions", type: "EXPENSE" },
		{ name: "Gambling", type: "EXPENSE" },

		{ name: "Stocks", type: "INVESTMENT" },
		{ name: "Real Estate", type: "INVESTMENT" },
		{ name: "Crypto", type: "INVESTMENT" },
		{ name: "Precious Metals", type: "INVESTMENT" },
		{ name: "Bonds", type: "INVESTMENT" },
		{ name: "Index Funds", type: "INVESTMENT" },
		{ name: "Mutual Funds", type: "INVESTMENT" },
		{ name: "ISA", type: "INVESTMENT" },
	];

	const categories = await Promise.all(
		categoryDefs.map((c) => prisma.category.create({ data: { name: c.name, type: c.type, userId: user.id } }))
	);

	const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]));

	// Every day-based expense category, with its own realistic frequency (probability
	// per day) and amount range. Subscriptions and Holidays are deliberately excluded —
	// handled separately below.
	const dailyCategorySpecs: Record<string, { names: string[]; min: number; max: number; probability: number }> = {
		Coffee: { names: ["Costa Coffee", "Pret", "Starbucks", "Local cafe"], min: 3, max: 6, probability: 0.65 },
		Groceries: {
			names: ["Tesco", "Sainsbury's", "Aldi", "Lidl", "Waitrose", "ASDA"],
			min: 15,
			max: 85,
			probability: 0.14,
		},
		Snacks: { names: ["Newsagent", "Corner shop", "WHSmith"], min: 2, max: 10, probability: 0.35 },
		Alcohol: { names: ["Night out", "Off licence"], min: 25, max: 70, probability: 0.05 },
		"Eating out": {
			names: ["Nando's", "Pizza Express", "Wagamama", "Local restaurant", "Dishoom"],
			min: 18,
			max: 60,
			probability: 0.12,
		},
		Transport: {
			names: ["Trainline ticket", "Lime bike", "Uber ride", "National Express"],
			min: 5,
			max: 45,
			probability: 0.25,
		},
		Takeaway: { names: ["Deliveroo order", "Uber Eats order"], min: 12, max: 35, probability: 0.1 },
		Entertainment: { names: ["Cinema ticket", "Concert ticket", "Vinyl record"], min: 8, max: 60, probability: 0.08 },
		Clothes: { names: ["ASOS order", "Zara", "Uniqlo", "Nike", "H&M"], min: 20, max: 120, probability: 0.04 },
		"Fitness/Gym": { names: ["Padel court hire", "Sports kit", "Decathlon"], min: 10, max: 50, probability: 0.04 },
		Gifts: { names: ["Birthday gift", "Christmas gift", "Amazon gift order"], min: 10, max: 80, probability: 0.03 },
		Medical: { names: ["Pharmacy", "Dentist", "Opticians"], min: 8, max: 80, probability: 0.02 },
		Pets: { names: ["Pets at Home", "Vet visit", "Dog groomer"], min: 15, max: 100, probability: 0.02 },
		Insurance: {
			names: ["Car insurance", "Health insurance", "Travel insurance"],
			min: 20,
			max: 90,
			probability: 0.015,
		},
		Education: { names: ["Online course", "Textbook", "Udemy purchase"], min: 15, max: 150, probability: 0.015 },
		"Debt Repayment": { names: ["Credit card payment", "Loan repayment"], min: 50, max: 300, probability: 0.015 },
		Charity: { names: ["Cancer Research UK", "Local food bank", "Shelter"], min: 5, max: 50, probability: 0.015 },
		Gambling: { names: ["Bet365", "National Lottery"], min: 5, max: 50, probability: 0.015 },
	};

	const investmentCategories = ["Stocks", "ISA", "Crypto", "Index Funds"];

	const transactionData = [];

	for (let month = 0; month < 12; month++) {
		// salary, once a month
		transactionData.push({
			type: "INCOME" as const,
			name: "Salary",
			amount: 3200,
			date: getDateFromToday(-(month * 30 + 1)),
			categoryId: categoryMap["Salary"],
			userId: user.id,
		});

		// every day-based category rolls its own probability, each day of the month
		for (let day = 1; day <= 30; day++) {
			for (const [categoryName, spec] of Object.entries(dailyCategorySpecs)) {
				if (faker.datatype.boolean({ probability: spec.probability })) {
					transactionData.push({
						type: "EXPENSE" as const,
						name: faker.helpers.arrayElement(spec.names),
						amount: faker.number.float({ min: spec.min, max: spec.max, fractionDigits: 2 }),
						date: getDateFromToday(-(month * 30 + day)),
						categoryId: categoryMap[categoryName],
						userId: user.id,
					});
				}
			}
		}

		// occasional side hustle or other income
		if (faker.datatype.boolean()) {
			const isOneOff = faker.datatype.boolean();
			transactionData.push({
				type: "INCOME" as const,
				name: isOneOff ? "Selling old items" : "Freelance work",
				amount: faker.number.float({ min: 80, max: 600, fractionDigits: 2 }),
				date: getDateFromToday(-(month * 30 + faker.number.int({ min: 5, max: 25 }))),
				categoryId: isOneOff ? categoryMap["Other income"] : categoryMap["Side hustle"],
				userId: user.id,
			});
		}

		// occasional investment contribution
		if (faker.datatype.boolean()) {
			const category = faker.helpers.arrayElement(investmentCategories);
			transactionData.push({
				type: "INVESTMENT" as const,
				name: `${category} contribution`,
				amount: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
				date: getDateFromToday(-(month * 30 + faker.number.int({ min: 5, max: 25 }))),
				categoryId: categoryMap[category],
				userId: user.id,
			});
		}
	}

	// Two holiday trips a year, each a realistic cluster: flight + accommodation, close in time
	for (let trip = 0; trip < 2; trip++) {
		const tripDay = faker.number.int({ min: 1, max: 360 });
		transactionData.push({
			type: "EXPENSE" as const,
			name: "Flight booking",
			amount: faker.number.float({ min: 150, max: 450, fractionDigits: 2 }),
			date: getDateFromToday(-tripDay),
			categoryId: categoryMap["Holidays"],
			userId: user.id,
		});
		transactionData.push({
			type: "EXPENSE" as const,
			name: faker.helpers.arrayElement(["Hotel booking", "Airbnb"]),
			amount: faker.number.float({ min: 200, max: 500, fractionDigits: 2 }),
			date: getDateFromToday(-(tripDay - 2)),
			categoryId: categoryMap["Holidays"],
			userId: user.id,
		});
	}

	await prisma.transaction.createMany({ data: transactionData });

	await prisma.recurringPayment.createMany({
		data: [
			{
				name: "Rent",
				amount: 1200,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-160),
				nextPaymentDate: getDateFromToday(10),
				categoryId: categoryMap["Rent/Mortgage"],
				userId: user.id,
			},
			{
				name: "Phone bill",
				amount: 35,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-145),
				nextPaymentDate: getDateFromToday(15),
				categoryId: categoryMap["Bills"],
				userId: user.id,
			},
			{
				name: "Electricity & Gas",
				amount: 110,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-155),
				nextPaymentDate: getDateFromToday(5),
				categoryId: categoryMap["Bills"],
				userId: user.id,
			},
			{
				name: "Water",
				amount: 32,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-158),
				nextPaymentDate: getDateFromToday(8),
				categoryId: categoryMap["Bills"],
				userId: user.id,
			},
			{
				name: "Council Tax",
				amount: 175,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-150),
				nextPaymentDate: getDateFromToday(2),
				categoryId: categoryMap["Bills"],
				userId: user.id,
			},
			{
				name: "Broadband",
				amount: 28,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-152),
				nextPaymentDate: getDateFromToday(12),
				categoryId: categoryMap["Bills"],
				userId: user.id,
			},
			{
				name: "Netflix",
				amount: 15.99,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-140),
				nextPaymentDate: getDateFromToday(6),
				categoryId: categoryMap["Subscriptions"],
				userId: user.id,
			},
			{
				name: "Gym membership",
				amount: 39.99,
				interval: "MONTHLY",
				firstPaymentDate: getDateFromToday(-150),
				nextPaymentDate: getDateFromToday(3),
				categoryId: categoryMap["Fitness/Gym"],
				userId: user.id,
			},
		],
	});

	await prisma.space.createMany({
		data: [
			{ name: "Trip to Paris", target: 1500, current: 620, userId: user.id },
			{ name: "Emergency fund", target: 3000, current: 1200, userId: user.id },
			{ name: "New laptop", target: 900, current: 900, userId: user.id },
		],
	});

	console.log("Seed complete:", {
		user: user.email,
		categories: categories.length,
		transactions: transactionData.length,
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
