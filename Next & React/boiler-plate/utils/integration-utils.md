# Integration Utils

src/utils/infiniteQueryUtils.ts

```ts
import { IPagination } from "@/types/common";
import { InfiniteData } from "@tanstack/react-query";

// -------------------[ Get next page utility utility function ]-------------------

type GetNextPageParamArgs = {
  pagination: IPagination;
};

export function getNextPageParam(lastPage: GetNextPageParamArgs) {
  if (lastPage.pagination?.nextPage) {
    return lastPage.pagination?.nextPage;
  }
  return undefined;
}

// -------------------[ Transform infinite data utility function ]-------------------

type TransformInfiniteDataArgs<T, TKey extends string> = {
  pagination: IPagination;
} & {
  [K in TKey]: T[];
};

export function transformInfiniteData<TData, TKey extends string>(
  data: InfiniteData<TransformInfiniteDataArgs<TData, TKey>> | undefined,
  key: TKey
) {
  return data?.pages.flatMap((each) => each[key]) ?? [];
}
```

src/utils/handleMutationError.ts

```ts
"use client";
import { DynamicObject } from "@/types/common";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------
// 🔹 Common utility to extract a readable message from any Axios/Error
// ----------------------------------------------------------------------
function extractErrorMessage(error: Error | AxiosError): string {
  try {
    if (axios.isAxiosError(error)) {
      const responseMessage = error?.response?.data?.message;

      // 1️⃣ Message is a plain string
      if (typeof responseMessage === "string") {
        return responseMessage;
      }

      // 2️⃣ Message is an array of constraint objects (NestJS validation errors)
      if (Array.isArray(responseMessage)) {
        const messages = responseMessage.flatMap(
          (each: { constraints?: DynamicObject }) =>
            each?.constraints ? Object.values(each.constraints) : []
        );
        if (messages.length > 0) return messages.join(", ");
      }

      // 3️⃣ Fallback: Axios' own message
      if (typeof error.message === "string") {
        return error.message;
      }
    } else if (typeof error.message === "string") {
      return error.message;
    }
  } catch {
    // Ignore
  }

  // 4️⃣ Default fallback
  return "An unexpected error occurred";
}

// ----------------------------------------------------------------------
// 🔹 Toast-based handler (UI feedback)
// ----------------------------------------------------------------------
export function handleMutationError(error: Error | AxiosError) {
  toast.dismiss();
  const message = extractErrorMessage(error);
  toast.error(message);
}

// ----------------------------------------------------------------------
// 🔹 Return-based handler (non-UI usage)
// ----------------------------------------------------------------------
export function returnMutationError(error: Error | AxiosError): string {
  return extractErrorMessage(error);
}
```

## Common Types

src/types/common.ts

```ts
import React, { Dispatch, SetStateAction } from "react";

type AnyBase = string | boolean | null | number | undefined;

export type Any = AnyBase | Record<string, AnyBase>;

export type DynamicObject = {
  [key: string]: string;
};

export type LabelValuePair = {
  label: string;
  value: string;
};

export type LabelElementValuePair = {
  label: string | React.ReactNode;
  value: string;
};

export type StringOrNum = string | number;

export type ReactDispatch<T> = Dispatch<SetStateAction<T>>;

export type VoidFunctionWithTArg<T> = (_args: T) => void;

export type TFunctionWithYArg<Y, T> = (_args: Y) => T;

export type VoidFunctionWithBooleanArg = (_args: boolean) => void;

export type VoidFunction = () => void;

export type PromiseVoidFunction = () => Promise<void>;

export type VoidFunctionWithStringArg = (_args: string) => void;

export type StringFunctionWithStringArg = (_args: string) => string;

export type VoidFunctionWithNumberArg = (_args: number) => void;

export type VoidFunctionWithArrayOfStringArg = (_args: string[]) => void;

export type VoidFunctionWithStringOrNullArg = (_args: string | null) => void;

export type VoidFunctionWithArrayOfStringOrStringArg = (
  _args: string | string[]
) => void;

export type DynamicObjectWithObject = {
  [key: string]: string | DynamicObjectWithObject;
};

export type DotNestedKeys<T> = {
  // eslint-disable-next-line
  [K in keyof T & string]: T[K] extends Record<string, any>
    ? `${K}` | `${K}.${DotNestedKeys<T[K]>}`
    : `${K}`;
}[keyof T & string];

export type MouseClickEvent = TFunctionWithYArg<
  React.MouseEvent<HTMLButtonElement, MouseEvent>,
  void
>;
```
