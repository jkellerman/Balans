import InfoCard from "@/components/card/info-card";
import StatCard from "@/components/card/stat-card";
import DonutChart from "@/components/chart/charts/donut";
import LineChart from "@/components/chart/charts/line";
import ProgressBar from "@/components/progress-bar";
import RecentTransactions from "@/components/recent-transactions";
import { CardContent } from "@/components/ui/card";
import { upcomingPayments } from "@/mocks/data";

export default function Page() {
	return (
		<div className="mb-12 grid gap-y-4 px-5">
			<StatCard heading="total balance" icon="Wallet" value={6500.85} />
			<StatCard heading="total spending" icon="Wallet" value={250.8} />
			<InfoCard heading="top spending" subheading="19 - 26 June" linkText="view all" path="/transactions">
				<CardContent className="h-[170px] w-full">
					<DonutChart />
				</CardContent>
			</InfoCard>
			<StatCard heading="total saved" icon="Piggy" value={300.85} />
			<InfoCard heading="Trip to Marrakesh" subheading="75% progress" linkText="manage spaces" path="/spaces">
				<CardContent className="px-6 pb-4">
					<div className="mb-3 flex items-center gap-1">
						<span className="font-bold">£562.50</span>
						<span className="text-sm">of £750</span>
					</div>
					<ProgressBar />
				</CardContent>
			</InfoCard>
			<StatCard heading="total invested" icon="Investments" value={140} />
			<StatCard heading="subscriptions" icon="Subscriptions" value={20} />
			<InfoCard heading="Activity">
				<CardContent className="h-[170px] w-full lg:h-5/6">
					<LineChart />
				</CardContent>
			</InfoCard>
			<InfoCard heading="upcoming payments" linkText="payments" path="/subscriptions">
				<CardContent className="px-6 py-2">
					<ul>
						{upcomingPayments.map((payment, i) => (
							<li key={i} className="mb-4 flex items-center justify-between">
								<div className="flex flex-col">
									<span className="font-bold">{payment.name}</span>
									<span className="text-sm text-septenary">{payment.date}</span>
								</div>
								<span className="font-bold">£{payment.cost}</span>
							</li>
						))}
					</ul>
				</CardContent>
			</InfoCard>
			<InfoCard heading="recent transactions" linkText="view all" path="/transactions">
				<CardContent className="px-6 py-2">
					<RecentTransactions />
				</CardContent>
			</InfoCard>
		</div>
	);
}
