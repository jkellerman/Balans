import Link from "next/link";
import { redirect } from "next/navigation";

import ThemeProvider from "@/components/theme";

export default function Home() {
	redirect("/dashboard");
	return (
		<main className="flex flex-col items-center justify-between gap-10 p-24">
			<Link href="/dashboard" className="text-lg font-bold capitalize lg:text-xl">
				Go to Dashboard
			</Link>

			{/* <div className="flex">
				<ThemeProvider />
			</div> */}
		</main>
	);
}
