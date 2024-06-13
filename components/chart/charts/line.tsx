"use client";

import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import customLegend from "../components/legend";
import CustomTooltip from "../components/tooltip";

const data = [
	{ name: "Jun 19", expenses: 200, income: 400 },
	{ name: "Jun 20", expenses: 300, income: 798 },
	{ name: "Jun 21", expenses: 400, income: 300 },
	{ name: "Jun 22", expenses: 680, income: 800 },
	{ name: "Jun 23", expenses: 590, income: 300 },
	{ name: "Jun 24", expenses: 290, income: 400 },
	{ name: "Jun 25", expenses: 390, income: 200 },
	{ name: "Jun 26", expenses: 390, income: 100 },
];

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
	const { cx, cy, stroke, fill } = props;
	return (
		<g>
			<circle cx={cx} cy={cy} r={6} stroke={stroke} fill="none" strokeWidth={6} />
			<circle cx={cx} cy={cy} r={5} fill={fill} />
		</g>
	);
};

export default function MyLineChart() {
	const isSmallerScreen = useMediaQuery("(max-width: 768px)");

	return (
		<ResponsiveContainer>
			<LineChart
				width={600}
				height={300}
				data={data}
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
					activeDot={<CustomActiveDot stroke="#FFF" fill="hsl(var(--quaternary))" />}
					dot={false}
				/>
				<Line
					type="monotone"
					dataKey="expenses"
					stroke="hsl(var(--secondary))"
					strokeWidth={3}
					dot={false}
					activeDot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
