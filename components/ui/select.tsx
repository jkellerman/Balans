"use client";

import * as React from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

import Icons from "../icons";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<>
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				"inline-flex h-9 w-full items-center justify-between gap-1 rounded-md border border-border bg-senary/20 px-4 pt-0 text-sm capitalize text-septenary hover:transition-colors focus:shadow-[0_0px_0px_1px_#898989]",
				className
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<Icons icon="ChevronDown" className="h-4 w-4" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	</>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn("z-30 mt-1 hidden min-w-64 rounded-lg border border-border bg-background shadow-lg", className)}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport className={cn("px-3 py-4")}>{children}</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<>
		<SelectPrimitive.Label ref={ref} className={cn(className)} {...props} />
	</>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, forwardedRef) => (
	<>
		<SelectPrimitive.Item
			ref={forwardedRef}
			className={cn(
				"relative flex h-6 select-none items-center rounded-md py-4 pl-8 pr-9 text-sm capitalize text-septenary data-[highlighted]:bg-senary data-[disabled]:text-foreground data-[highlighted]:text-foreground data-[highlighted]:outline-none",
				className
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute left-1 inline-flex w-6 items-center justify-center">
				<Icons icon="Check" className="h-3 w-3" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	</>
));
SelectItem.displayName = SelectPrimitive.Separator.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<>
		<SelectPrimitive.Separator ref={ref} className={cn(className)} {...props} />
	</>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator };
