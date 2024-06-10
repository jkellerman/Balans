import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar/sidebar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-full w-full">
			<Sidebar />
			<div className="flex h-full w-full flex-col">
				<Header />
				<main className="flex h-full w-full flex-col">{children}</main>
			</div>
		</div>
	);
}
