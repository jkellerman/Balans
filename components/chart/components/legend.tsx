export default function customLegend(value: number, entry: any) {
	const { color } = entry;
	return (
		<span className="flex items-center">
			<svg width="10" height="10">
				<circle cx="5" cy="5" r="5" fill={color} />
			</svg>
			<span className="ml-2 text-sm capitalize text-septenary">{value}</span>
		</span>
	);
}
