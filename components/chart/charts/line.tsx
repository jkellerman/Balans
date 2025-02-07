"use client";

import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDateToMonth } from "@/lib/formatter";
import { data } from "@/mocks/data";
import { Transaction } from "@/types/data";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import customLegend from "../components/legend";
import CustomTooltip from "../components/tooltip";

interface MonthlyData {
	name: string;
	income: number;
	expenses: number;
}

export default function MyLineChart() {
	const isSmallerScreen = useMediaQuery("(max-width: 768px)");

	// Process the transactions to group by month and calculate income/expenses
	const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
		const monthlyData: Record<string, MonthlyData> = {};

		transactions.forEach((transaction) => {
			const month = formatDateToMonth(transaction.date);

			if (!monthlyData[month]) {
				monthlyData[month] = { name: month, income: 0, expenses: 0 };
			}

			if (transaction.type === "income") {
				monthlyData[month].income += transaction.amount;
			} else if (transaction.type === "expense") {
				monthlyData[month].expenses += transaction.amount;
			}
		});

		return Object.values(monthlyData);
	};

	// Prepare the monthly data for the chart
	const activityData = getMonthlyData(data.transactions);

	return (
		<>
			<ResponsiveContainer>
				<LineChart
					width={600}
					height={300}
					data={activityData}
					margin={{
						top: -40,
						right: 30,
						left: 20,
						bottom: 50,
					}}
				>
					<CartesianGrid
						horizontal={false}
						vertical={isSmallerScreen ? false : true}
						stroke="hsl(var(--senary))"
						strokeOpacity={0.5}
					/>

					<XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tickMargin={20} />
					<YAxis fontSize={12} axisLine={false} tickLine={false} tickMargin={20} padding={{ top: 6 }} />
					<Tooltip
						wrapperStyle={{ color: "white", borderRadius: "6px", padding: "5px" }}
						cursor={<CustomCursor width={50} height="60%" />}
						content={<CustomTooltip />}
					/>
					<Legend iconSize={0} formatter={customLegend} verticalAlign="top" align="right" />
					<Line
						type="monotone"
						dataKey="income"
						stroke="hsl(var(--tertiary))"
						strokeWidth={3}
						activeDot={<CustomActiveDot stroke="#FFF" fill="hsl(var(--quaternary))" line="income" />}
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="expenses"
						stroke="hsl(var(--secondary))"
						strokeWidth={3}
						dot={false}
						activeDot={<CustomActiveDot stroke="#FFF" fill="hsl(var(--quaternary))" line="expenses" />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

interface CustomCursorProps {
	points?: any;
	width: number;
	height: number | string;
}

const CustomCursor = ({ points, width, height }: CustomCursorProps) => {
	const { x, y } = points[0];
	return (
		<svg>
			<defs>
				<linearGradient id="cursorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style={{ stopColor: "hsl(var(--graph-cursor-primary))", stopOpacity: 1 }} />
					<stop offset="100%" style={{ stopColor: "hsl(var(--graph-cursor-secondary))", stopOpacity: 1 }} />
				</linearGradient>
			</defs>
			<rect
				x={x - width / 2} // Centre the rectangle on the x-axis
				y={y + 10}
				width={width}
				height={height}
				fill="url(#cursorGradient)"
				rx={10} // Border radius/Rounded corners
				ry={10} // Border radius/Rounded corners
				opacity={0.3}
			/>
		</svg>
	);
};

const CustomActiveDot = (props: any) => {
	const { cx, cy, stroke, fill, payload, line } = props;
	if (!payload[line]) return null;

	return (
		<g>
			<circle cx={cx} cy={cy} r={6} stroke={stroke} fill="none" strokeWidth={6} />
			<circle cx={cx} cy={cy} r={5} fill={fill} />
		</g>
	);
};
