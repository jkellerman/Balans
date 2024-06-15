"use client";

import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import customLegend from "../components/legend";
import CustomTooltip from "../components/tooltip";

export default function DonutChart() {
	const data = [
		{ name: "Eating Out", spent: 20 },
		{ name: "Groceries", spent: 25 },
		{ name: "Shopping", spent: 10 },
		{ name: "Transport", spent: 10 },
	];

	const COLORS = ["hsl(var(--primary))", "hsl(249, 15%, 18%)", "hsl(var(--septenary))", "hsl(var(--tertiary))"];

	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					data={data}
					dataKey="spent"
					nameKey="name"
					cx="40%"
					cy="45%"
					innerRadius={42}
					outerRadius={70}
					labelLine={false}
					stroke="none"
				>
					{data.map((_, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: "none" }} />
					))}
					<Label width={30} position="center" content={<CustomLabel value1={259.61} value2={-80.51} />}></Label>
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
					wrapperStyle={{ top: 2, right: 30, fontSize: 14, lineHeight: "1em" }}
					formatter={customLegend}
				/>
			</PieChart>
		</ResponsiveContainer>
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

	cy -= 5;

	return (
		<>
			<text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
				<tspan x={cx} dy="0" fontSize="16" fontWeight="bold" fill="hsl(var(--foreground))">
					£{value1}
				</tspan>
				<tspan x={cx} dy="1.5em" fontSize="12" fill="hsl(var(--tertiary))" fontWeight="bolder">
					{value2}%
				</tspan>
			</text>
		</>
	);
}
