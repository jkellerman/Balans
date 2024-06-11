import InfoCard from "@/components/card/info-card";
import StatCard from "@/components/card/stat-card";
import DonutChart from "@/components/chart/pie";
import { CardContent } from "@/components/ui/card";

export default function Page() {
	return (
		<div className="grid gap-y-4 px-5">
			<StatCard heading="total balance" icon="Wallet" value={6500.85} />
			<StatCard heading="total spending" icon="Wallet" value={250.8} />
			<InfoCard>
				<CardContent className="h-[240px] w-full pb-12">
					<DonutChart />
				</CardContent>
			</InfoCard>
		</div>
	);
}
