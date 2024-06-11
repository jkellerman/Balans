import { Types } from "@/types";

import Icons from "../icons";
import { Card, CardHeader, CardHeading, CardHeadingContainer, CardLink, CardSubHeading } from "../ui/card";

export default function InfoCard({ children }: Types.Children) {
	return (
		<Card className="h-[240px] w-full p-4 pb-12">
			<CardHeader>
				<CardHeadingContainer>
					<CardHeading>top spending</CardHeading>
					<CardSubHeading>19 - 26 June</CardSubHeading>
				</CardHeadingContainer>
				<CardLink href="/transactions">
					view all
					<span aria-hidden="true">
						<Icons icon="ChevronRight" className="h-2 w-2" />
					</span>
				</CardLink>
			</CardHeader>
			{children}
		</Card>
	);
}
