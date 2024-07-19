"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExpensePayments } from "@/mocks/data";

import Icons from "../icons";

export default function Expenses() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>
						<div className="flex items-center gap-1">
							name
							<Icons icon="Toggle" className="h-4 w-4" />
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-1">
							amount
							<Icons icon="Toggle" className="h-4 w-4" />
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-1 whitespace-nowrap">
							date
							<Icons icon="Toggle" className="h-4 w-4" />
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-1">
							category
							<Icons icon="Toggle" className="h-4 w-4" />
						</div>
					</TableHead>
					<TableHead>
						<div className="flex items-center gap-1">
							paid via
							<Icons icon="Toggle" className="h-4 w-4" />
						</div>
					</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{ExpensePayments.map((item, i) => (
					<TableRow key={i} className="text-xs sm:text-sm">
						<TableCell className="capitalize">{item.name}</TableCell>
						<TableCell>£{item.amount.toFixed(2)} </TableCell>
						<TableCell> {item.date} </TableCell>
						<TableCell className="py-6 capitalize">{item.category}</TableCell>
						<TableCell className="capitalize"> {item.paymentMethod} </TableCell>
						<TableCell>
							<div className="flex justify-evenly gap-4 xl:gap-0">
								<button className="text-foreground">
									<Icons icon="Edit" className="h-4 w-4" />
								</button>
								<button className="text-foreground">
									<Icons icon="Trash" className="h-4 w-4" />
								</button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
