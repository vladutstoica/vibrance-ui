"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { cn } from "../../../../utils/cn";
import { Button } from "../../../core/button/button";
import { Input } from "../input/input";

export interface NumberInputProps
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
  className?: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper = 1,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      className,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref ||
      internalRef) as React.RefObject<HTMLInputElement>;
    const [value, setValue] = React.useState<number | undefined>(
      controlledValue ?? defaultValue,
    );

    const handleIncrement = React.useCallback(() => {
      setValue((prev) =>
        prev === undefined ? stepper : Math.min(prev + stepper, max),
      );
    }, [stepper, max]);

    const handleDecrement = React.useCallback(() => {
      setValue((prev) =>
        prev === undefined ? -stepper : Math.max(prev - stepper, min),
      );
    }, [stepper, min]);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (document.activeElement === combinedRef.current) {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            handleIncrement();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            handleDecrement();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, combinedRef]);

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue;
      setValue(newValue);
      onValueChange?.(newValue);
    };

    const handleBlur = () => {
      if (value !== undefined) {
        if (value < min) {
          setValue(min);
          if (combinedRef.current) {
            combinedRef.current.value = String(min);
          }
        } else if (value > max) {
          setValue(max);
          if (combinedRef.current) {
            combinedRef.current.value = String(max);
          }
        }
      }
    };

    return (
      <div className={cn("group relative flex items-center", className)}>
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className={cn(
            "pr-8 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            "focus-within:ring-0 focus-within:ring-offset-0",
            "group-focus-within:ring-2 group-focus-within:ring-ring group-focus-within:ring-offset-2",
          )}
          getInputRef={combinedRef}
          {...props}
        />
        <div className="absolute top-0 right-0 flex h-full flex-col border-input border-l">
          <Button
            type="button"
            aria-label="Increase value"
            className="h-[50%] rounded-l-none rounded-br-none border-0 border-input border-b px-2 hover:bg-accent hover:text-accent-foreground focus-visible:z-10 focus-visible:ring-0"
            variant="ghost"
            onClick={handleIncrement}
            disabled={value === max}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            aria-label="Decrease value"
            className="h-[50%] rounded-l-none rounded-tr-none border-0 px-2 hover:bg-accent hover:text-accent-foreground focus-visible:z-10 focus-visible:ring-0"
            variant="ghost"
            onClick={handleDecrement}
            disabled={value === min}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
