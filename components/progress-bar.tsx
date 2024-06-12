"use client";

import { useEffect, useState } from "react";

import { Progress } from "./ui/progress";

export default function ProgressBar() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => setProgress(75), 500);
		return () => clearTimeout(timer);
	}, []);
	return <Progress value={progress} max={100} style={{ width: `${progress}%` }} />;
}
