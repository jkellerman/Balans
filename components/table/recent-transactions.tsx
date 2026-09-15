import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEMO_USER_ID } from "@/lib/constants";
import { formatDate } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import { prisma } from "@/lib/prisma";

import Fallback from "../no-data-fallback";

export default async function RecentTransactions() {
	let recentTransactions: Awaited<ReturnType<typeof prisma.transaction.findMany<{ include: { category: true } }>>>;
	let fetchFailed = false;
	try {
		recentTransactions = await prisma.transaction.findMany({
			where: { userId: DEMO_USER_ID },
			orderBy: { date: "desc" },
			take: 4,
			include: { category: true },
		});
	} catch {
		recentTransactions = [];
		fetchFailed = true;
	}

	return (
		<div className="flex h-full items-center justify-center">
			{fetchFailed ? (
				<Fallback message="Unable to load transactions" />
			) : recentTransactions.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>name/business</TableHead>
							<TableHead>category</TableHead>
							<TableHead>amount</TableHead>
							<TableHead>date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{recentTransactions.map((item) => (
							<TableRow key={item.id} className="text-xs sm:text-sm">
								<TableCell className="flex items-center gap-x-4">
									<span className="min-h-7 min-w-7 rounded-md bg-senary"></span>
									{item.name}
								</TableCell>
								<TableCell className="capitalize">{item.category.name}</TableCell>
								<TableCell>
									{item.type === "EXPENSE"
										? formatCurrency(Number(item.amount))
										: `+${formatCurrency(Number(item.amount))}`}
								</TableCell>
								<TableCell>{formatDate(item.date)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<Fallback />
			)}
		</div>
	);
}
