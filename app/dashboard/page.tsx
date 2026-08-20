import InfoCard from "@/components/card/info-card";
import StatCard from "@/components/card/stat-card";
import DonutChart from "@/components/chart/charts/donut";
import LineChart from "@/components/chart/charts/line";
import ProgressBar from "@/components/progress-bar";
import RecentTransactions from "@/components/table/recent-transactions";
import { CardContent } from "@/components/ui/card";
import UpcomingPayments from "@/components/upcoming-payments";
import { formatDateShort } from "@/lib/date";
import { generateRecurringTransactions } from "@/lib/utils";
import { data } from "@/mocks/data";
import { AccountData, RecurringPayment } from "@/types/account-data";

export default function Page() {
	const today = new Date();
	const sixMonthsBefore = new Date();
	sixMonthsBefore.setMonth(today.getMonth() - 6);

	const donutSubHeading = `${formatDateShort(sixMonthsBefore)} - ${formatDateShort(today)}`;
	const calculateRemainingAmount = (data: AccountData) => {
		const totalIncome = data.transactions
			.filter((transaction) => transaction.type === "income")
			.reduce((acc, transaction) => acc + transaction.amount, 0);
		const totalExpenses = data.transactions
			.filter((transaction) => transaction.type === "expense")
			.reduce((acc, transaction) => acc + transaction.amount, 0);
		const totalFromRecurringPayments = generateRecurringTransactions(data.recurringPayments).reduce(
			(acc, transaction) => acc + transaction.amount,
			0
		);

		return totalIncome - totalExpenses - totalFromRecurringPayments;
	};

	const calculateTotalSpending = (data: AccountData) => {
		const totalExpenses = data.transactions
			.filter((transaction) => transaction.type === "expense")
			.reduce((acc, transaction) => acc + transaction.amount, 0);

		const totalFromRecurringPayments = generateRecurringTransactions(data.recurringPayments).reduce(
			(acc, transaction) => acc + transaction.amount,
			0
		);

		return totalExpenses + totalFromRecurringPayments;
	};

	const calculateTotalInvested = (data: AccountData) => {
		return data.investments.reduce((acc, investment) => acc + investment.amount, 0);
	};

	const calculateTotalSubscriptions = (data: RecurringPayment[]) => {
		return generateRecurringTransactions(data)
			.filter((payment) => payment.category !== "rent" && payment.category !== "phone bill")
			.reduce((acc, transaction) => acc + transaction.amount, 0);
	};

	return (
		<div className="mb-4 grid gap-4 px-5 sm:grid-cols-12 xl:mx-auto xl:w-full xl:max-w-[1600px] xl:grid-cols-10 xl:px-12">
			<div className="sm:col-span-6 xl:col-span-2">
				<StatCard heading="available balance" icon="Wallet" value={calculateRemainingAmount(data)} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:col-start-7 xl:col-span-2 xl:col-start-3">
				<StatCard heading="total spending" icon="Expenses" value={calculateTotalSpending(data)} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:row-span-3 sm:row-start-2 xl:col-span-3 xl:col-start-8 xl:row-span-2 xl:row-start-2">
				<InfoCard heading="top spending" subheading={donutSubHeading} linkText="view insights" path="/insights">
					<CardContent className="h-[170px] w-full sm:h-[220px] xl:h-[180px]">
						<DonutChart />
					</CardContent>
				</InfoCard>
			</div>
			<div className="sm:col-span-6 sm:col-start-7 sm:row-start-2 xl:col-span-2 xl:col-start-5 xl:row-start-1">
				<StatCard heading="total saved" icon="Piggy" value={562.5} isCurrency />
			</div>
			<div className="sm:col-span-12 sm:col-start-1 sm:row-start-5 lg:col-span-6 lg:col-start-1 lg:row-start-5 xl:col-span-3 xl:col-start-8 xl:row-start-4">
				<InfoCard heading="Savings for holiday" subheading="75% progress" linkText="manage spaces" path="/spaces">
					<CardContent className="flex flex-col px-7 pb-4 lg:h-[112px] lg:justify-end xl:h-auto">
						<div className="mb-3 flex items-center gap-1">
							<span className="font-bold">£562.50</span>
							<span className="text-sm">of £750</span>
						</div>
						<ProgressBar />
					</CardContent>
				</InfoCard>
			</div>
			<div className="sm:col-span-6 sm:col-start-7 sm:row-start-3 xl:col-span-2 xl:col-start-7 xl:row-start-1">
				<StatCard heading="total invested" icon="Investments" value={calculateTotalInvested(data)} isCurrency />
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
