import React from "react";

import { cn } from "../../../../utils/cn";

// data
import { currencies as AllCurrencies } from "country-data-list";

// shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/select";

// radix-ui
import type { SelectProps } from "@radix-ui/react-select";

// types
export interface Currency {
  code: string;
  decimals: number;
  name: string;
  number: string;
  symbol: string;
}

// constants
// import { allCurrencies, customCurrencies } from "@/lib/constants/currencies";

interface CurrencySelectProps extends Omit<SelectProps, "onValueChange"> {
  onValueChange?: (value: string) => void;
  onCurrencySelect?: (currency: Currency) => void;
  name: string;
  placeholder?: string;
  currencies?: "custom" | "all";
  variant?: "default" | "small";
  valid?: boolean;
  /** Array of currency codes to include when currencies="custom" */
  includedCurrencies?: string[];
  /** Array of currency codes to exclude when currencies="all" */
  excludedCurrencies?: string[];
}

const CurrencySelect = React.forwardRef<HTMLButtonElement, CurrencySelectProps>(
  (
    {
      value,
      onValueChange,
      onCurrencySelect,
      name,
      placeholder = "Select currency",
      currencies = "all",
      variant = "default",
      valid = true,
      includedCurrencies = [],
      excludedCurrencies = [],
      ...props
    },
    ref,
  ) => {
    const [selectedCurrency, setSelectedCurrency] =
      React.useState<Currency | null>(null);

    const uniqueCurrencies = React.useMemo<Currency[]>(() => {
      const currencyMap = new Map<string, Currency>();

      for (const currency of AllCurrencies.all as any[]) {
        if (currency.code && currency.name && currency.symbol) {
          let shouldInclude = false;

          switch (currencies) {
            case "custom":
              shouldInclude = includedCurrencies.includes(currency.code);
              break;
            case "all":
              shouldInclude = !excludedCurrencies.includes(currency.code);
              break;
            default:
              shouldInclude = !excludedCurrencies.includes(currency.code);
          }

          if (shouldInclude) {
            const currencyData: Currency = {
              code: currency.code,
              name: currency.code === "EUR" ? "Euro" : currency.name,
              decimals: currency.decimals,
              number: currency.number,
              symbol: currency.symbol,
            };
            currencyMap.set(currency.code, currencyData);
          }
        }
      }

      // Convert the map to an array and sort by currency name
      return Array.from(currencyMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }, [currencies, includedCurrencies, excludedCurrencies]);

    const handleValueChange = (newValue: string) => {
      const fullCurrencyData = uniqueCurrencies.find(
        (curr) => curr.code === newValue,
      );
      if (fullCurrencyData) {
        setSelectedCurrency(fullCurrencyData);
        if (onValueChange) {
          onValueChange(newValue);
        }
        if (onCurrencySelect) {
          onCurrencySelect(fullCurrencyData);
        }
      }
    };

    void selectedCurrency;

    return (
      <Select
        value={value}
        onValueChange={handleValueChange}
        {...props}
        name={name}
        data-valid={valid}
      >
        <SelectTrigger
          className={cn("w-full", variant === "small" && "w-fit gap-2")}
          data-valid={valid}
          ref={ref}
        >
          {value && variant === "small" ? (
            <SelectValue placeholder={placeholder}>
              <span>{value}</span>
            </SelectValue>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {uniqueCurrencies.map((currency) => (
              <SelectItem key={currency?.code} value={currency?.code || ""}>
                <div className="flex w-full items-center gap-2">
                  <span className="w-8 text-left text-muted-foreground text-sm">
                    {currency?.code}
                  </span>
                  <span className="hidden">{currency?.symbol}</span>
                  <span>{currency?.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
);

CurrencySelect.displayName = "CurrencySelect";

export { CurrencySelect };
