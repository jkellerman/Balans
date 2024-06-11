"use client";

import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function DonutChart() {
	const data = [
		{ name: "Eating Out", value: 20 },
		{ name: "Groceries", value: 25 },
		{ name: "Shopping", value: 10 },
		{ name: "Transport", value: 10 },
	];

	const COLORS = ["hsl(var(--primary))", "hsl(var(--quaternary))", "hsl(var(--septenary))", "hsl(var(--tertiary))"];

	function customLegendText(value: number, entry: any) {
		const { color } = entry;
		return (
			<span style={{ display: "flex", alignItems: "center" }}>
				<svg width="10" height="10">
					<circle cx="5" cy="5" r="5" fill={color} />
				</svg>
				<span style={{ marginLeft: 8, color: "hsl(var(--septenary))" }}>{value}</span>
			</span>
		);
	}
	return (
		<ResponsiveContainer>
			<PieChart>
				<Pie
					data={data}
					dataKey="value"
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
					wrapperStyle={{ top: 20, right: 30, fontSize: 14, lineHeight: "1em" }}
					formatter={customLegendText}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}

interface CustomToolTipProps {
	active?: any;
	payload?: any;
	label?: any;
}

function CustomTooltip({ active, payload, label }: CustomToolTipProps) {
	function getLabel(label: string) {
		if (label === "Eating Out") {
			return "£300";
		}
		if (label === "Groceries") {
			return "£200";
		}
		if (label === "Shopping") {
			return "£100";
		}
		if (label === "Transport") {
			return "£100";
		}
		return "";
	}
	if (active && payload && payload.length) {
		return (
			<div className="rounded-md bg-senary px-3 py-2">
				<p className="label">{`£${payload[0].value}`}</p>
				<p className="intro">{getLabel(label)}</p>
			</div>
		);
	}

	return null;
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
					£{value1}
				</tspan>
				<tspan x={cx} dy="1.5em" fontSize="12" fill="hsl(var(--tertiary))" fontWeight="bolder">
					{value2}%
				</tspan>
			</text>
		</>
	);
}
