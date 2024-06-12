import Icons from "../icons";
import { Card, CardHeader, CardHeading, CardHeadingContainer, CardLink, CardSubHeading } from "../ui/card";

interface InfoCardProps {
	children: React.ReactNode;
	heading: string;
	subheading: string;
	linkText: string;
	path: string;
}

export default function InfoCard({ children, heading, subheading, linkText, path }: InfoCardProps) {
	return (
		<Card className="w-full p-4">
			<CardHeader>
				<CardHeadingContainer>
					<CardHeading>{heading}</CardHeading>
					<CardSubHeading>{subheading}</CardSubHeading>
				</CardHeadingContainer>
				<CardLink href={path}>
					{linkText}
					<span aria-hidden="true">
						<Icons icon="ChevronRight" className="h-2 w-2 translate-y-[1px]" />
					</span>
				</CardLink>
			</CardHeader>
			{children}
		</Card>
	);
}
