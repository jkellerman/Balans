"use client";

import { useEffect, useState } from "react";

import { Progress } from "./ui/progress";

export default function ProgressBar({ value }: { value: number }) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => setProgress(value), 500);
		return () => clearTimeout(timer);
	}, [value]);

	return <Progress value={progress} max={100} style={{ width: `${progress}%` }} className="mb-2" />;
}
