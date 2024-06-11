import Icons from "../icons";
import { Card, CardHeader, CardHeading, CardHeadingContainer, CardLink, CardSubHeading } from "../ui/card";

interface InfoCardProps {
	children: React.ReactNode;
	heading: string;
	subheading: string;
	linkText: string;
}

export default function InfoCard({ children, heading, subheading, linkText }: InfoCardProps) {
	return (
		<Card className="h-[240px] w-full p-4 pb-12">
			<CardHeader>
				<CardHeadingContainer>
					<CardHeading>{heading}</CardHeading>
					<CardSubHeading>{subheading}</CardSubHeading>
				</CardHeadingContainer>
				<CardLink href="/transactions">
					{linkText}
					<span aria-hidden="true">
						<Icons icon="ChevronRight" className="h-2 w-2" />
					</span>
				</CardLink>
			</CardHeader>
			{children}
		</Card>
	);
}
