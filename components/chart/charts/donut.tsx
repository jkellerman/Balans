"use client";

import Fallback from "@/components/no-data-fallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatCurrencyShort } from "@/lib/formatter";
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import customLegend from "../components/legend";
import CustomTooltip from "../components/tooltip";

interface DonutChartProps {
	topSpending: { category: string; amount: number }[];
	fetchFailed?: boolean;
}

export default function DonutChart({ topSpending, fetchFailed }: DonutChartProps) {
	const isSmallerScreen = useMediaQuery("(max-width: 768px)");

	const legendPositionRight = isSmallerScreen ? 30 : 50;

	const COLORS = ["hsl(var(--senary))", "hsl(var(--octonary))", "hsl(var(--nonary))", "hsl(var(--primary))"];

	return (
		<div className="flex h-full flex-row items-center justify-center">
			{fetchFailed ? (
				<Fallback message="Unable to load spending data" />
			) : topSpending && topSpending.length > 0 ? (
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={topSpending}
							dataKey="amount"
							nameKey="category"
							cx="40%"
							cy="45%"
							innerRadius={42}
							outerRadius={70}
							labelLine={false}
							stroke="none"
							cornerRadius={2}
							paddingAngle={4}
						>
							{topSpending.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: "none" }} />
							))}
							<Label
								width={30}
								position="center"
								content={
									<CustomLabel value1={topSpending.reduce((total, item) => total + item.amount, 0)} value2={-80.51} />
								}
							></Label>
						</Pie>
						<Tooltip
							content={<CustomTooltip />}
							wrapperStyle={{
								color: "white",
								borderRadius: "6px",
								padding: "5px",
							}}
						/>
						<Legend
							align="right"
							verticalAlign="middle"
							layout="vertical"
							iconSize={0}
							wrapperStyle={{ top: 2, right: legendPositionRight, fontSize: 14, lineHeight: "1em" }}
							formatter={customLegend}
						/>
					</PieChart>
				</ResponsiveContainer>
			) : (
				<Fallback />
			)}
		</div>
	);
}

interface CustomLabelProps {
	viewBox?: {
		cx: number;
		cy: number;
	};
	value1: number;
	value2: number;
}

function CustomLabel({ viewBox, value1, value2 }: CustomLabelProps) {
	let { cx, cy } = viewBox as { cx: number; cy: number };

	cy -= 7;

	return (
		<>
			<text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
				<tspan x={cx} dy="0" fontSize="16" fontWeight="bold" fill="hsl(var(--foreground))">
					{formatCurrencyShort(value1)}
				</tspan>
				<tspan x={cx} dy="1.5em" fontSize="12" fill="hsl(var(--tertiary))" fontWeight="bolder">
					{value2}%
				</tspan>
			</text>
		</>
	);
}
