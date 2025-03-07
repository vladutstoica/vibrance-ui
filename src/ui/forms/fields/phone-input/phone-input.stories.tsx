import type { Meta, StoryObj } from "@storybook/react";

import { PhoneInput } from "./phone-input";

const meta = {
  title: "Forms/Fields/PhoneInput",
  component: PhoneInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter phone number",
  },
};

export const WithInitialValue: Story = {
  args: {
    value: "+14155552671",
    placeholder: "Enter phone number",
  },
};

export const Disabled: Story = {
  args: {
    value: "+14155552671",
    placeholder: "Enter phone number",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter phone number",
    className: "border-destructive",
  },
};
