import Icons from "./icons";

export default function Search() {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="search" className="text-sm capitalize text-septenary">
				Search for payment
			</label>
			<div className="relative flex flex-1 flex-shrink-0">
				<input
					className="peer block w-full rounded-md border border-border bg-senary/20 py-[7px] pl-10 pr-2 text-sm font-medium outline-1 outline-foreground/30 transition-colors"
					placeholder="Search"
					type="search"
					name="search"
					id="search"
					autoComplete="off"
				/>
				<Icons
					icon="MagnifyingGlass"
					className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-septenary transition-colors duration-300 hover:transition-colors peer-focus:text-foreground"
				/>
			</div>
		</div>
	);
}
