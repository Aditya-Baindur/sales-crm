"use client";

import type { ComponentProps } from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function DropdownMenu(props: ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger(
  props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return (
    <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 min-w-[168px] overflow-hidden rounded-lg border border-line-strong bg-popover p-1 text-popover-foreground shadow-[0px_12px_32px_0px_rgba(0,0,0,0.45),0px_0px_0px_1px_#0e0e0e] duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:ease-power3-in data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:ease-power3-out",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "caption-style relative flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-foreground outline-none select-none transition-colors duration-150 ease-power3-in-out data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-white/6",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuRadioGroup(
  props: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>,
) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "caption-style relative flex cursor-pointer items-center gap-2 rounded-md py-2 pr-2 pl-6 text-soft outline-none select-none transition-colors duration-150 ease-power3-in-out data-[highlighted]:bg-white/6 data-[highlighted]:text-foreground data-[state=checked]:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-2 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="block size-1.5 rounded-full bg-status" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn("caption-style px-2 py-1.5 text-subtle", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-line-strong", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
