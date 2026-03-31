# Dropdown and Selects

Add input styles from inputs.md and handleRippleAnimation from buttons.md

## Dropdown

```tsx
"use client";

import * as React from "react";
import { DropdownMenu } from "radix-ui";

import { cn } from "@/lib/utils";
import { handleRippleAnimation } from "@/lib/ui/handleRippleAnimation";

import LabelContainer from "./label-container";

type DropdownItem = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  onClick?: (value: string) => void;
};

type Props = {
  children: React.ReactNode;
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  items?: DropdownItem[];
  contentClassName?: string;
  required?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Dropdown = ({
  children,
  label,
  error,
  containerClassName,
  labelClassName,
  items = [],
  contentClassName,
  required,
  open,
  defaultOpen,
  onOpenChange
}: Props) => {
  return (
    <LabelContainer
      error={error}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={required}
    >
      <DropdownMenu.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            align="start"
            className={cn(
              "z-50 min-w-(--radix-dropdown-menu-trigger-width) overflow-hidden rounded-lg border border-border-primary bg-background p-1 shadow-sm",
              contentClassName
            )}
          >
            {items.map((item) => (
              <DropdownMenu.Item
                key={item.value}
                disabled={item.disabled}
                onMouseDown={(e) => {
                  handleRippleAnimation(
                    e as unknown as React.MouseEvent<
                      HTMLButtonElement,
                      MouseEvent
                    >,
                    "bg-primary"
                  );
                }}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-left text-sm text-text-primary outline-none overflow-hidden",
                  "focus:bg-primary/10",
                  item.disabled && "pointer-events-none opacity-50"
                )}
              >
                {item.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </LabelContainer>
  );
};

export default Dropdown;
```

## Select

```tsx
"use client";

import { Check, ChevronDown } from "lucide-react";
import { Select as RadixSelect } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  endIconStyles,
  inputStyles,
  startIconStyles
} from "@/styles/ui/inputStyles";
import { ReactDispatch } from "@/types/common";

import LabelContainer from "./label-container";
import { handleRippleAnimation } from "@/lib/ui/handleRippleAnimation";

type SelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type Props = Omit<
  React.ComponentProps<typeof RadixSelect.Root>,
  "value" | "defaultValue" | "onValueChange"
> & {
  label?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  setValue?: ReactDispatch<string>;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  name?: string;
};

const Select = ({
  label,
  error,
  value,
  defaultValue,
  placeholder = "Select an option",
  startIcon,
  endIcon,
  setValue,
  onValueChange,
  options,
  containerClassName,
  labelClassName,
  triggerClassName,
  contentClassName,
  name,
  required,
  disabled,
  ...rest
}: Props) => {
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  const handleValueChange = (nextValue: string) => {
    setValue?.(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <LabelContainer
      error={error}
      htmlFor={name}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={required}
    >
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        name={name}
        required={required}
        disabled={disabled}
        {...rest}
      >
        <RadixSelect.Trigger
          aria-invalid={Boolean(error)}
          className={cn(
            inputStyles,
            "relative flex items-center justify-between gap-3 text-left overflow-hidden",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasStartIcon && "pl-10",
            (hasEndIcon || !endIcon) && "pr-10",
            triggerClassName
          )}
          onPointerDown={(e) => {
            handleRippleAnimation(
              e as unknown as React.MouseEvent<HTMLButtonElement>,
              "bg-black/50"
            );
          }}
        >
          {hasStartIcon && (
            <span className={cn(startIconStyles, "pointer-events-none")}>
              {startIcon}
            </span>
          )}
          <RadixSelect.Value
            placeholder={
              <span className="text-text-secondary">{placeholder}</span>
            }
          />
          {hasEndIcon ? (
            <span className={cn(endIconStyles, "pointer-events-none")}>
              {endIcon}
            </span>
          ) : (
            <RadixSelect.Icon asChild>
              <ChevronDown
                className={cn(endIconStyles, "size-4 text-text-secondary")}
              />
            </RadixSelect.Icon>
          )}
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={8}
            className={cn(
              "z-50 min-w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-border-primary bg-background shadow-sm",
              contentClassName
            )}
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 pr-8 text-sm text-text-primary outline-none",
                    "focus:bg-primary/10 data-disabled:pointer-events-none data-disabled:opacity-50",
                    "overflow-hidden"
                  )}
                  onMouseDown={(e) => {
                    handleRippleAnimation(
                      e as unknown as React.MouseEvent<HTMLButtonElement>,
                      "bg-primary/50"
                    );
                  }}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute right-3 inline-flex items-center">
                    <Check className="size-4 text-primary" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </LabelContainer>
  );
};

export default Select;
```
