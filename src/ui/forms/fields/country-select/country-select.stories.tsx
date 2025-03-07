import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CountrySelect } from "./country-select";
import type { Country } from "./country-select";

const meta = {
  title: "Design System/Forms/Fields/CountrySelect",
  component: CountrySelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select a country",
  },
};

export const WithDefaultValue: Story = {
  args: {
    placeholder: "Select a country",
    defaultValue: "USA",
  },
};

export const Controlled: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = React.useState<
      Country | undefined
    >();
    return (
      <div className="flex flex-col gap-4">
        <CountrySelect
          placeholder="Select a country"
          value={selectedCountry?.alpha3}
          onChange={(country) => {
            setSelectedCountry(country);
            console.log("Selected country:", country);
          }}
        />
        <div className="text-sm">
          {selectedCountry ? (
            <pre className="rounded-md bg-muted p-4">
              {JSON.stringify(selectedCountry, null, 2)}
            </pre>
          ) : (
            "No country selected"
          )}
        </div>
      </div>
    );
  },
};

export const Slim: Story = {
  args: {
    slim: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Select a country",
    disabled: true,
  },
};
