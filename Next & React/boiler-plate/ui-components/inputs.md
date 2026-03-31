# Different Inputs Types

## Common

/styles/ui/inputStyles.ts

```ts
import { cn } from "@/lib/utils";

export const inputStyles = cn(
  "h-9 w-full",
  "rounded-lg border border-border-primary",
  "bg-input",
  "px-3 py-2",
  "text-base text-text-primary",
  "placeholder:text-text-secondary",
  "focus:outline-primary"
);

export const startIconStyles = cn(
  "pointer-events-auto",
  "absolute left-3",
  "inline-flex items-center"
);

export const endIconStyles = cn(
  "pointer-events-auto",
  "absolute right-3",
  "inline-flex items-center"
);
```

/global.css

```css
/* ========================|| Input Auto Fill Color Handler ||======================== */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--input) inset !important;
  color: var(--text-primary) !important;
}
```

## Label Container

/components/ui/label-container.tsx

```tsx
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  label?: string;
  error?: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

const LabelContainer = ({
  children,
  error,
  label,
  htmlFor,
  required,
  className,
  labelClassName
}: Props) => {
  return (
    <div className={cn("flex", "flex-col", "gap-2", "w-full", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-[0.95rem]",
            "font-medium",
            "leading-6",
            "text-text-primary",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-xl text-red-600 ms-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default LabelContainer;
```

## Text Input

```tsx
import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import React from "react";
import LabelContainer from "./label-container";
import {
  endIconStyles,
  inputStyles,
  startIconStyles
} from "@/styles/ui/inputStyles";

const TextInput = ({
  label,
  error,
  value,
  setValue,
  startIcon,
  endIcon,
  containerClassName,
  labelClassName,
  ...rest
}: React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  value?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  setValue?: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
}) => {
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  return (
    <LabelContainer
      error={error}
      htmlFor={rest.id}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={rest.required}
    >
      <div className={cn("relative", "flex", "items-center")}>
        {hasStartIcon && <span className={startIconStyles}>{startIcon}</span>}
        <input
          {...rest}
          type="text"
          className={cn(
            inputStyles,
            hasStartIcon && "pl-10",
            hasEndIcon && "pr-10",
            rest.className
          )}
          value={value}
          onChange={(e) => {
            setValue?.(e.target.value);
            rest.onChange?.(e);
          }}
        />
        {hasEndIcon && <span className={endIconStyles}>{endIcon}</span>}
      </div>
    </LabelContainer>
  );
};

export default TextInput;
```

## Password Input

```tsx
import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import React from "react";
import LabelContainer from "./label-container";
import {
  endIconStyles,
  inputStyles,
  startIconStyles
} from "@/styles/ui/inputStyles";

const PasswordInput = ({
  label,
  error,
  value,
  setValue,
  startIcon,
  containerClassName,
  labelClassName,
  showToggle = true,
  ...rest
}: Omit<React.ComponentProps<"input">, "type"> & {
  label?: string;
  error?: string;
  value?: string;
  startIcon?: React.ReactNode;
  setValue?: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
  showToggle?: boolean;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const hasStartIcon = Boolean(startIcon);

  return (
    <LabelContainer
      error={error}
      htmlFor={rest.id}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={rest.required}
    >
      <div className={cn("relative", "flex", "items-center")}>
        {hasStartIcon && <span className={startIconStyles}>{startIcon}</span>}
        <input
          type={isVisible ? "text" : "password"}
          className={cn(inputStyles, hasStartIcon && "pl-10", rest.className)}
          {...rest}
          value={value}
          onChange={(e) => {
            setValue?.(e.target.value);
            rest.onChange?.(e);
          }}
        />
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className={cn(
            endIconStyles,
            "text-text-secondary",
            "transition-colors",
            "hover:text-text-primary"
          )}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? (
            <svg
              className={cn("size-5")}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 12c2.1-4.2 5.7-6.3 9-6.3s6.9 2.1 9 6.3c-2.1 4.2-5.7 6.3-9 6.3S5.1 16.2 3 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              className={cn("size-5")}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 5.5 20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.9 9.9a3 3 0 0 0 4.24 4.24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M6.4 6.4C4.9 7.6 3.7 9.4 3 12c2.1 4.2 5.7 6.3 9 6.3 1.6 0 3.2-.5 4.7-1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10.2 5.8c.6-.1 1.2-.2 1.8-.2 3.3 0 6.9 2.1 9 6.3-.5 1.1-1.1 2.1-1.8 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </LabelContainer>
  );
};

export default PasswordInput;
```

## Otp Input

```tsx
"use client";

import * as React from "react";
import {
  OTPInput as OTPInputPrimitive,
  OTPInputContext,
  type OTPInputProps
} from "input-otp";

import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";

import LabelContainer from "./label-container";

const otpInputCellClassName = cn(
  "relative flex h-12 w-12 items-center justify-center rounded-lg border border-border-primary bg-input text-base text-text-primary outline-none transition-all",
  "first:ms-0",
  "ms-3",
  "data-[active=true]:ring-primary data-[active=true]:ring-2",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
);

type Props = Omit<
  OTPInputProps,
  "children" | "render" | "onChange" | "maxLength"
> & {
  label?: string;
  error?: string;
  setValue?: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  maxLength?: number;
};

function OtpInputSlot({
  index,
  className
}: {
  index: number;
  className?: string;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-active={isActive}
      className={cn(otpInputCellClassName, className)}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-primary duration-1000" />
        </div>
      )}
    </div>
  );
}

const OtpInput = ({
  value,
  setValue,
  containerClassName,
  maxLength = 6,
  required,
  label,
  className,
  inputClassName,
  labelClassName,
  error,
  disabled,
  ...rest
}: Props) => {
  return (
    <LabelContainer
      error={error}
      htmlFor={rest.id}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={required}
    >
      <OTPInputPrimitive
        value={value}
        maxLength={maxLength}
        spellCheck={false}
        disabled={disabled}
        onChange={(nextValue) => setValue?.(nextValue)}
        containerClassName="flex items-center disabled:opacity-50"
        className={cn("w-fit disabled:cursor-not-allowed", inputClassName)}
        {...rest}
      >
        {Array.from({ length: maxLength }, (_, index) => (
          <OtpInputSlot key={index} index={index} className={className} />
        ))}
      </OTPInputPrimitive>
    </LabelContainer>
  );
};

export default OtpInput;
```

## Phone Input

run:

```bash
pnpm add i18n-iso-countries react-phone-input-2 libphonenumber-js cmdk
```

/components/ui/country-flag.tsx

```tsx
"use client";
import Image from "next/image";
import { useState } from "react";

const CountryFlag = ({ countryCode }: { countryCode?: string | null }) => {
  const [error, setError] = useState(false);
  const isValidCode =
    typeof countryCode === "string" && /^[A-Za-z]{2}$/.test(countryCode);

  if (!isValidCode || error) {
    return (
      <div className="border border-kala rounded-full h-7 w-7 flex center">
        ?
      </div>
    );
  }
  const code = countryCode.toLowerCase();
  return (
    <Image
      src={`https://flagcdn.com/256x192/${code}.png`}
      // srcSet={`https://flagcdn.com/32x24/${code}.png 2x,
      //          https://flagcdn.com/48x36/${code}.png 3x`}
      width="24"
      height="18"
      alt={countryCode}
      onError={() => setError(true)}
    />
  );
};

export default CountryFlag;
```

/components/ui/phone-input.tsx

```tsx
"use client";
import { Command, CommandItem, CommandList } from "cmdk";
import { Popover } from "radix-ui";
import { cn } from "@/lib/utils";
import countriesLib from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import parsePhoneNumberFromString, {
  CountryCode,
  getCountries,
  getCountryCallingCode
} from "libphonenumber-js";
import { Search } from "lucide-react";
import React, { forwardRef, useState } from "react";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountryFlag from "./country-flag";
import LabelContainer from "./label-container";
import { inputStyles, startIconStyles } from "@/styles/ui/inputStyles";

countriesLib.registerLocale(enLocale);

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> & {
  label?: string;
  error?: string;
  value?: string;
  containerClassName?: string;
  labelClassName?: string;
} & {
  inputClassName?: string;
  onChange?: (_args: string) => void;
  value?: string;
  defaultCountry?: string;
};

const countries = getCountries().filter((each) => each !== "AC");

const getCountryFromNumber = (phone?: string) => {
  if (!phone || !phone.length) {
    return "";
  }
  phone = phone.replaceAll("+", "");
  const parsed = parsePhoneNumberFromString(phone ? `+${phone}` : "");
  return parsed?.country?.toLowerCase();
};

const PhoneInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      containerClassName,
      maxLength,
      required,
      label,
      value,
      onChange,
      defaultCountry,
      error,
      labelClassName,
      ...rest
    },
    // eslint-disable-next-line
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = useState(
      getCountryFromNumber(value) || defaultCountry
    );
    const [displayCountry, setDisplayCountry] = useState(
      getCountryFromNumber(value) || defaultCountry
    );
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    return (
      <LabelContainer
        error={error}
        htmlFor={rest.id}
        label={label}
        className={containerClassName}
        labelClassName={labelClassName}
        required={required}
      >
        <div
          className={cn(
            "relative",
            "flex items-center",
            "border border-border-primary",
            "focus-within:outline-2 focus-within:outline-primary",
            "rounded-lg"
          )}
        >
          {/* ✅ Custom Dropdown */}
          <Popover.Popover open={open} onOpenChange={setOpen}>
            <Popover.PopoverTrigger
              asChild
              disabled={rest.disabled}
              className="cursor-pointer"
            >
              <button
                type="button"
                className={cn(
                  "min-w-16 2xl:min-w-20",
                  "flex items-center justify-center",
                  "px-2",
                  "border-r border-border-primary",
                  "mr-2",
                  "h-[38px] 2xl:h-12",
                  "bg-background rounded-l-md text-sm font-medium",
                  "cursor-pointer",
                  "whitespace-nowrap"
                )}
                disabled={rest.disabled}
              >
                <span className="mr-1 text-xl mb-[1px] w-[19px] 2xl:w-6">
                  <CountryFlag countryCode={displayCountry} />
                </span>
                <span className="">
                  {displayCountry
                    ? `+${getCountryCallingCode(
                        displayCountry.toUpperCase() as CountryCode
                      )}`
                    : null}
                </span>
              </button>
            </Popover.PopoverTrigger>

            <Popover.PopoverContent
              side="top"
              className="w-[300px] py-3 px-0 bg-background border-border-primary shadow-sm"
            >
              <Command>
                <h1 className="font-medium text-base px-4 pb-2">
                  Select Country Code
                </h1>

                {/* 🔍 Search Box */}
                <div className="px-4 py-2">
                  <div className={cn("relative", "flex", "items-center")}>
                    <div
                      className={cn(
                        startIconStyles,
                        "text-text-secondary px-2"
                      )}
                    >
                      <Search className="size-5" />
                    </div>
                    <input
                      className={cn(inputStyles, "h-9", "pl-12")}
                      placeholder="Search country"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* 📋 Filtered List */}
                <CommandList className="custom-scrollbar max-h-48 2xl:max-h-60 overflow-y-auto">
                  {countries
                    .filter((country) => {
                      const isoCode = country.toUpperCase();
                      const countryName =
                        countriesLib.getName(isoCode, "en") || "";
                      const callingCode = `+${getCountryCallingCode(
                        isoCode as CountryCode
                      )}`;

                      const query = searchTerm.trim().toLowerCase();

                      return (
                        isoCode.toLowerCase().includes(query) || // PK
                        countryName.toLowerCase().includes(query) || // Pakistan
                        callingCode.includes(query) // +92
                      );
                    })
                    .map((country) => {
                      const isoCode = country.toUpperCase();
                      const countryName =
                        countriesLib.getName(isoCode, "en") || "";

                      return (
                        <CommandItem
                          key={country}
                          value={country.toLowerCase()}
                          onSelect={() => {
                            setSelectedCountry(country);
                            setDisplayCountry(country);
                            setOpen(false);
                          }}
                          className="flex gap-2 text-sm text-text-primary font-medium cursor-pointer hover:bg-primary/10 px-4 py-2"
                        >
                          <span className="mr-2 text-2xl">
                            <CountryFlag countryCode={country} />
                          </span>
                          {countryName} ({isoCode}) (+
                          {getCountryCallingCode(isoCode as CountryCode)})
                        </CommandItem>
                      );
                    })}
                </CommandList>
              </Command>
            </Popover.PopoverContent>
          </Popover.Popover>
          <PhoneInput2
            country={selectedCountry?.toLowerCase()}
            value={value}
            onChange={(phone, country) => {
              onChange?.(phone);
              if (phone.length === 0) {
                setDisplayCountry("");
                return;
              }
              //   @ts-expect-error not required
              if (country?.countryCode) {
                //   @ts-expect-error not required
                setDisplayCountry(country?.countryCode);
              }
            }}
            disableDropdown
            inputProps={{
              name: "phoneNumber"
            }}
            placeholder={rest.placeholder}
            inputClass={cn(
              rest.disabled && "!cursor-default",
              "!h-[48px] !w-full !bg-background",
              "!ps-0 !border-none rounded-md !text-base"
            )}
            buttonStyle={{ display: "none" }}
            enableSearch={false}
            disabled={rest.disabled}
          />
        </div>
      </LabelContainer>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
```
