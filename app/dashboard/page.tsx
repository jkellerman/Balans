import InfoCard from "@/components/card/info-card";
import StatCard from "@/components/card/stat-card";
import DonutChart from "@/components/chart/donut";
import ProgressBar from "@/components/progress-bar";
import { CardContent } from "@/components/ui/card";

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
				<CardContent className="mt-4">
					<div className="mb-3 flex items-center gap-1">
						<span className="font-bold">£562.50</span>
						<span className="text-sm">of £750</span>
					</div>
					<ProgressBar />
				</CardContent>
			</InfoCard>
			<StatCard heading="total invested" icon="Investments" value={140} />
			<StatCard heading="subscriptions" icon="Subscriptions" value={20} />
		</div>
	);
}
