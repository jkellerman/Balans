"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import { generateRecurringTransactions } from "@/lib/utils";
import { data } from "@/mocks/data";

import Fallback from "../no-data-fallback";

export default function RecentTransactions() {
	const allTransactions = [];
	allTransactions.push(...data.transactions);
	allTransactions.push(...generateRecurringTransactions(data.recurringPayments));

	const sortedTransactions = allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const recentTransactions = sortedTransactions.slice(0, 4);
	return (
		<div className="flex h-full items-center justify-center">
			{recentTransactions && recentTransactions.length > 0 ? (
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
						{recentTransactions.map((item, i) => (
							<TableRow key={i} className="text-xs sm:text-sm">
								<TableCell className="flex items-center gap-x-4">
									<span className="min-h-7 min-w-7 rounded-md bg-senary"></span>
									{item.name}
								</TableCell>
								<TableCell className="capitalize">{item.category}</TableCell>
								<TableCell>{formatCurrency(item.type === "expense" ? -item.amount : item.amount)} </TableCell>
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
