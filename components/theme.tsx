"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";

import Icons from "./icons";

const themes = ["system", "dark", "light"];

const ThemeProvider = () => {
	const { setTheme, theme: currentTheme } = useTheme();

	return (
		<>
			{themes.map((theme, i) => (
				<div key={i} className="flex w-12 flex-col items-center gap-4">
					<button
						className={clsx(
							"flex h-11 w-8 items-center justify-center whitespace-nowrap rounded border border-border text-xs text-white",
							{
								"bg-tertiary": theme === "dark",
								"border-text/50 bg-white": theme === "light",
								"bg-text": theme === "system",
								"outline outline-2 outline-primary": currentTheme === theme,
							}
						)}
						onClick={() => setTheme(`${theme}`)}
					>
						{theme === "system" && <Icons icon="Piggy" className="w-4b h-4 text-foreground" />}
					</button>
					<span>{theme}</span>
				</div>
			))}
		</>
	);
};

export default ThemeProvider;
