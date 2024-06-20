import { upcomingPayments } from "@/mocks/data";

export default function UpcomingPayments() {
	return (
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
	);
}
