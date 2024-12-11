import React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md ", {
	variants: {
		variant: {
			primary:
				"relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-primary text-quinary shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-foreground before:duration-500 before:ease-out hover:shadow-secondary hover:before:h-56 hover:before:w-56",
			secondary: "",
			destructive: "",
			ghost: "text-tertiary",
		},
		size: {
			default: "px-5 py-2 text-sm font-bold",
			sm: "px-3 py-2",
			md: "px-4 py-2",
			none: "p-0",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
