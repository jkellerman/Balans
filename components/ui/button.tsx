import React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md ", {
	variants: {
		variant: {
			primary: "",
			secondary: "",
			destructive: "",
			ghost: "text-tertiary",
		},
		size: {
			default: "px-5 py-2 text-sm",
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
