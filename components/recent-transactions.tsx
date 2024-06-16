"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { recentTransactions } from "@/mocks/data";

export default function RecentTransactions() {
	const isSmallerScreen = useMediaQuery("(max-width: 768px)");

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>name/business</TableHead>
					{!isSmallerScreen && <TableHead>category</TableHead>}
					<TableHead>amount</TableHead>
					<TableHead>date</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{recentTransactions.map((item, i) => (
					<TableRow key={i} className="text-xs sm:text-sm">
						<TableCell className="flex items-center gap-4">
							<span className="min-h-7 min-w-7 rounded-md bg-senary"></span>
							{item.name}
						</TableCell>
						{!isSmallerScreen && <TableCell className="capitalize">{item.category}</TableCell>}
						<TableCell>£{item.amount.toFixed(2)} </TableCell>
						<TableCell> {item.date} </TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
