interface CustomToolTipProps {
	active?: boolean;
	payload?: any;
}

export default function CustomTooltip({ active, payload }: CustomToolTipProps) {
	if (active && payload && payload.length) {
		return (
			<div className="flex flex-col rounded-md bg-[hsl(249,15%,18%)] px-3 py-2">
				<span className="text-sm font-semibold capitalize">{`${payload[0].dataKey}: £${payload[0].value}`}</span>
				{payload.length === 2 && (
					<span className="text-sm font-semibold capitalize">{`${payload[1].dataKey}: £${payload[1].value}`}</span>
				)}
			</div>
		);
	}

	return null;
}