import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./number-input";

const meta: Meta<typeof NumberInput> = {
  title: "Design System/Forms/Fields/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter a number",
  },
};

export const WithStepper: Story = {
  args: {
    placeholder: "Enter a number",
    stepper: 5,
    defaultValue: 10,
  },
};

export const WithMinMax: Story = {
  args: {
    placeholder: "Enter a number (0-100)",
    min: 0,
    max: 100,
    defaultValue: 50,
  },
};

export const WithDecimals: Story = {
  args: {
    placeholder: "Enter a decimal number",
    decimalScale: 2,
    fixedDecimalScale: true,
    defaultValue: 10.5,
    stepper: 0.1,
  },
};

export const WithThousandSeparator: Story = {
  args: {
    placeholder: "Enter a large number",
    thousandSeparator: ",",
    defaultValue: 1000000,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    placeholder: "Enter amount",
    prefix: "$",
    suffix: " USD",
    defaultValue: 100,
    decimalScale: 2,
    fixedDecimalScale: true,
  },
};
