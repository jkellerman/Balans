import { prisma } from "./prisma";

// TODO(demo-mode): when local, non-persisted demo mutations are built,
// add a sumByTypeLocal(transactions, type) here — same shape as
// aggregate() above, but operating on an in-memory array instead of
// querying Postgres. Don't try to share one function across both.

// export function sumByTypeLocal(
// 	transactions: { type: TransactionType; amount: number }[],
// 	type: TransactionType
// ): number {
// 	return transactions.filter((t) => t.type === type).reduce((acc, t) => acc + t.amount, 0);
// }

export async function sumRecurringByCategory(userId: string, categoryName: string): Promise<number> {
	const payments = await prisma.recurringPayment.findMany({
		where: { userId, category: { name: categoryName } },
	});
	return payments.reduce((acc, p) => acc + Number(p.amount), 0);
}
