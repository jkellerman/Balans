interface FallbackProps {
	message?: string;
}

export default function Fallback({ message = "No data" }: FallbackProps) {
	return (
		<div className="-translate-y-1/2">
			<span className="flex min-h-14 w-fit min-w-24 items-center justify-center px-3 py-2 text-center">{message}</span>
		</div>
	);
}
