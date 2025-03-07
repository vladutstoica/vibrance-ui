import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CurrencySelect } from "./currency-select";
import type { Currency } from "./currency-select";

const meta = {
  title: "Design System/Forms/Fields/CurrencySelect",
  component: CurrencySelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CurrencySelect>;

export default meta;
type Story = StoryObj<typeof CurrencySelect>;

export const Default: Story = {
  args: {
    name: "currency",
    placeholder: "Select currency",
  },
};

export const Small: Story = {
  args: {
    name: "currency",
    placeholder: "Select currency",
    variant: "small",
  },
};

export const AllCurrencies: Story = {
  args: {
    name: "currency",
    placeholder: "Select currency",
    currencies: "all",
  },
};

export const Controlled: Story = {
  args: {
    name: "currency",
    placeholder: "Select currency",
  },
  render: (args) => {
    const [selectedCurrency, setSelectedCurrency] =
      React.useState<Currency | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <CurrencySelect
          {...args}
          value={selectedCurrency?.code}
          onCurrencySelect={(currency) => {
            setSelectedCurrency(currency);
            console.log("Selected currency:", currency);
          }}
        />
        <div className="text-sm">
          {selectedCurrency ? (
            <pre className="rounded-md bg-muted p-4">
              {JSON.stringify(selectedCurrency, null, 2)}
            </pre>
          ) : (
            "No currency selected"
          )}
        </div>
      </div>
    );
  },
};
