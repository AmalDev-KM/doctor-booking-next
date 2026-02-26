"use client";

import * as React from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type InputProps<T extends FieldValues> = React.ComponentProps<"input"> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HookForm: UseFormReturn<T, any, any>; // ✅ FIX HERE
  name: Path<T>;
};

function FormInput<T extends FieldValues>({
  className,
  type,
  HookForm,
  name,
  ...props
}: InputProps<T>) {
  return (
    <Controller
      control={HookForm.control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {/* INPUT WRAPPER ONLY */}
          <div className="relative">
            <input
              {...field}
              {...props}
              id={name}
              type={type}
              data-slot="input"
              aria-invalid={!!fieldState.error}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className,
              )}
            />
          </div>

          {/* ERROR OUTSIDE INPUT HEIGHT */}
          <p className="text-red-500 text-sm mt-1 min-h-5">
            {fieldState.error?.message || ""}
          </p>
        </div>
      )}
    />
  );
}

export { FormInput };
