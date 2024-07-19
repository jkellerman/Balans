import InfoCard from "@/components/card/info-card";
import StatCard from "@/components/card/stat-card";
import IncomePayments from "@/components/income-payments";
import Search from "@/components/search";
import { CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IncomeCategories } from "@/mocks/data";

export default function Page() {
	return (
		<div className="mb-4 grid gap-4 px-5 sm:grid-cols-12 xl:mx-auto xl:w-full xl:max-w-[1600px] xl:grid-cols-10 xl:px-12">
			<div className="sm:col-span-6 sm:col-start-1 sm:row-start-2 xl:col-span-4 xl:col-start-7 xl:row-start-1">
				<div className="rounded-xl border border-border px-7 py-3">
					<div className="flex flex-col gap-4 xl:flex-row">
						<div className="xl:w-1/2">
							<Search />
						</div>
						<div className="flex flex-col gap-2 xl:w-1/2">
							<h3 className="text-sm text-septenary">Category</h3>
							<Select defaultValue={IncomeCategories[0].name}>
								<SelectTrigger>
									<SelectValue placeholder="View all..." />
								</SelectTrigger>
								<SelectContent>
									{IncomeCategories.map((category, i) => (
										<SelectItem key={i} value={category.name}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
			<div className="overflow-auto sm:col-span-12 sm:row-span-3 sm:row-start-3 xl:col-span-10 xl:col-start-1 xl:row-start-2">
				<InfoCard heading="payments">
					<CardContent className="px-7 py-2">
						<IncomePayments />
					</CardContent>
				</InfoCard>
			</div>
			<div className="sm:col-span-6 xl:col-span-2">
				<StatCard heading="available balance" icon="Wallet" value={6500.85} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:col-start-7 xl:col-span-2">
				<StatCard heading="total income" icon="Wallet" value={250.8} isCurrency />
			</div>
			<div className="sm:col-span-6 sm:col-start-7 sm:row-start-2 xl:col-span-2 xl:col-start-5 xl:row-start-1">
				<StatCard heading="total payments" icon="Wallet" value={100} />
			</div>
		</div>
	);
}
