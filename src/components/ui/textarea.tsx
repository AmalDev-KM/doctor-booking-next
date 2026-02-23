"use client"

import * as React from "react"
import {
  Controller,
  FieldValues,
  Path,
  UseFormReturn
} from "react-hook-form"
import { cn } from "@/lib/utils"

type TextareaProps<T extends FieldValues> =
  React.ComponentProps<"textarea"> & {
    HookForm: UseFormReturn<T, unknown, unknown>
    name: Path<T>
  }

function Textarea<T extends FieldValues>({
  className,
  HookForm,
  name,
  ...props
}: TextareaProps<T>) {
  return (
    <Controller
      control={HookForm.control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {/* Your Original Textarea (styles unchanged) */}
          <textarea
            {...field}
            {...props}
            id={name}
            data-slot="textarea"
            aria-invalid={!!fieldState.error}
            className={cn(
              "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
          />

          {/* Error Message (reserved space → no layout shift) */}
          <p className="text-red-500 text-sm mt-1 min-h-5">
            {fieldState.error?.message || ""}
          </p>
        </div>
      )}
    />
  )
}

export { Textarea }