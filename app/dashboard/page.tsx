import InfoCard from "@/components/card/info-card";
import StatCard from "@/components/card/stat-card";
import DonutChart from "@/components/chart/charts/donut";
import LineChart from "@/components/chart/charts/line";
import ProgressBar from "@/components/progress-bar";
import RecentTransactions from "@/components/table/recent-transactions";
import { CardContent } from "@/components/ui/card";
import UpcomingPayments from "@/components/upcoming-payments";
import { DEMO_USER_ID } from "@/lib/constants";
import { formatDateShort } from "@/lib/date";
import { formatCurrency } from "@/lib/formatter";
import { prisma } from "@/lib/prisma";
import { generateRecurringTransactions } from "@/lib/utils";
import { data } from "@/mocks/data";
import { RecurringPayment } from "@/types/account-data";

export default async function Page() {
	const today = new Date();
	const sixMonthsBefore = new Date();
	sixMonthsBefore.setMonth(today.getMonth() - 6);
	const [expenseAgg, incomeAgg, investmentAgg] = await Promise.allSettled([
		prisma.transaction.aggregate({ where: { userId: DEMO_USER_ID, type: "EXPENSE" }, _sum: { amount: true } }),
		prisma.transaction.aggregate({ where: { userId: DEMO_USER_ID, type: "INCOME" }, _sum: { amount: true } }),
		prisma.transaction.aggregate({ where: { userId: DEMO_USER_ID, type: "INVESTMENT" }, _sum: { amount: true } }),
	]);

	// TODO: totalSpending currently only counts real Transaction rows. Once recurring payments logic is built, fold in payments that would have occurred by now from the RecurringPayment table.
	const totalSpending = expenseAgg.status === "fulfilled" ? Number(expenseAgg.value._sum.amount ?? 0) : null;
	const totalIncome = incomeAgg.status === "fulfilled" ? Number(incomeAgg.value._sum.amount ?? 0) : null;
	const totalInvested = investmentAgg.status === "fulfilled" ? Number(investmentAgg.value._sum.amount ?? 0) : null;
	const remainingAmount = totalIncome !== null && totalSpending !== null ? totalIncome - totalSpending : null;

	let totalSaved: number | null;
	let spaces: Awaited<ReturnType<typeof prisma.space.findMany>>;
	try {
		spaces = await prisma.space.findMany({
			where: { userId: DEMO_USER_ID },
		});
		totalSaved = spaces.reduce((acc, space) => acc + Number(space.current), 0);
	} catch {
		spaces = [];
		totalSaved = null;
	}

	let featuredSpace: Awaited<ReturnType<typeof prisma.space.findFirst>>;
	let featuredSpaceFetchFailed = false;
	try {
		featuredSpace = await prisma.space.findFirst({
			where: { userId: DEMO_USER_ID },
			orderBy: { order: "asc" },
		});
	} catch {
		featuredSpace = null;
		featuredSpaceFetchFailed = true;
	}

	const donutSubHeading = `${formatDateShort(sixMonthsBefore)} - ${formatDateShort(today)}`;

	const calculateTotalSubscriptions = (data: RecurringPayment[]) => {
		return generateRecurringTransactions(data)
			.filter((payment) => payment.category !== "rent" && payment.category !== "phone bill")
			.reduce((acc, transaction) => acc + transaction.amount, 0);
	};

	return (
		<div className="mb-4 grid gap-4 px-5 sm:grid-cols-12 xl:mx-auto xl:w-full xl:max-w-[1600px] xl:grid-cols-10 xl:px-12">
			<div className="sm:col-span-6 xl:col-span-2">
				<StatCard heading="available balance" icon="Wallet" value={remainingAmount} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:col-start-7 xl:col-span-2 xl:col-start-3">
				<StatCard heading="total spending" icon="Expenses" value={totalSpending} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:row-span-3 sm:row-start-2 xl:col-span-3 xl:col-start-8 xl:row-span-2 xl:row-start-2">
				<InfoCard heading="top spending" subheading={donutSubHeading} linkText="view insights" path="/insights">
					<CardContent className="h-[170px] w-full sm:h-[220px] xl:h-[180px]">
						<DonutChart />
					</CardContent>
				</InfoCard>
			</div>
			<div className="sm:col-span-6 sm:col-start-7 sm:row-start-2 xl:col-span-2 xl:col-start-5 xl:row-start-1">
				<StatCard heading="total saved" icon="Piggy" value={totalSaved} isCurrency />
			</div>
			<div className="sm:col-span-12 sm:col-start-1 sm:row-start-5 lg:col-span-6 lg:col-start-1 lg:row-start-5 xl:col-span-3 xl:col-start-8 xl:row-start-4">
				<InfoCard
					heading={featuredSpace ? `${featuredSpace.name}` : "Savings"}
					subheading={
						featuredSpace
							? `${Math.round((Number(featuredSpace.current) / Number(featuredSpace.target)) * 100)}% progress`
							: undefined
					}
					linkText="manage spaces"
					path="/spaces"
					className="flex h-full flex-col"
				>
					<CardContent className="flex flex-1 flex-col justify-end px-7 pb-4">
						{featuredSpace ? (
							<>
								<div className="mb-3 flex items-center gap-1">
									<span className="font-bold">{formatCurrency(Number(featuredSpace.current))}</span>
									<span className="text-sm">of {formatCurrency(Number(featuredSpace.target))}</span>
								</div>
								<ProgressBar value={Math.round((Number(featuredSpace.current) / Number(featuredSpace.target)) * 100)} />
							</>
						) : (
							<div className="mb-3 flex items-center gap-1">
								<p className="text-muted-foreground text-base">
									{featuredSpaceFetchFailed ? "Unable to load savings goals" : "No savings goals yet"}
								</p>
							</div>
						)}
					</CardContent>
				</InfoCard>
			</div>
			<div className="sm:col-span-6 sm:col-start-7 sm:row-start-3 xl:col-span-2 xl:col-start-7 xl:row-start-1">
				<StatCard heading="total invested" icon="Investments" value={totalInvested} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:col-start-7 sm:row-start-4 xl:col-span-2 xl:col-start-9 xl:row-start-1">
				<StatCard
					heading="subscriptions"
					icon="Subscriptions"
					value={calculateTotalSubscriptions(data.recurringPayments)}
					isCurrency
				/>
			</div>
			<div className="relative sm:col-span-12 sm:row-start-6 lg:max-h-[270px] xl:col-span-7 xl:col-start-1 xl:row-span-3 xl:row-start-2">
				<InfoCard heading="Activity">
					<CardContent className="h-[170px] w-full lg:min-h-[270px] lg:px-8">
						<LineChart />
					</CardContent>
				</InfoCard>
			</div>
			<div className="sm:col-span-12 sm:row-start-7 lg:col-span-6 lg:col-start-7 lg:row-start-5 xl:col-span-3 xl:col-start-8 xl:row-start-5">
				<InfoCard heading="upcoming payments" linkText="payments" path="/subscriptions">
					<CardContent className="h-[175px] px-7 py-2 lg:h-full xl:h-[188px]">
						<UpcomingPayments />
					</CardContent>
				</InfoCard>
			</div>
			<div className="overflow-auto sm:col-span-12 sm:row-start-8 lg:row-start-7 lg:mt-16 xl:col-span-7 xl:col-start-1 xl:row-span-2 xl:row-start-4">
				<InfoCard heading="recent transactions" linkText="view all" path="/transactions">
					<CardContent className="h-[308px] px-7 py-2">
						<RecentTransactions />
					</CardContent>
				</InfoCard>
			</div>
		</div>
	);
}
