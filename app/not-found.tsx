import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main className="flex h-screen flex-col items-center justify-center">
			<h1 className="mb-8 text-lg font-bold lg:text-xl">Coming soon</h1>
			<Button asChild>
				<Link href="/">
					<span className="relative z-10">Go home</span>
				</Link>
			</Button>
		</main>
	);
}
