"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

export default function Avatar() {
	return (
		<AvatarPrimitive.Root className="hidden h-9 w-9 items-center justify-center rounded-full bg-primary text-xl font-bold text-quinary md:inline-flex">
			<AvatarPrimitive.Image src="" alt="" />
			<AvatarPrimitive.Fallback>J</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	);
}
