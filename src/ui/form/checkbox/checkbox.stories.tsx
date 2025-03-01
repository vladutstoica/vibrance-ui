import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Label } from "../label/label";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Design System/Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state of the checkbox",
      table: {
        type: { summary: "boolean" },
      },
    },
    defaultChecked: {
      control: "boolean",
      description: "The default checked state when initially rendered",
      table: {
        type: { summary: "boolean" },
      },
    },
    disabled: {
      control: "boolean",
      description:
        "When true, prevents the user from interacting with the checkbox",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description:
        "When true, indicates that the user must check this checkbox",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Common label styles
const labelStyles =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  args: {
    id: "terms",
  },
};

export const WithText: Story = {
  render: (args) => (
    <div className="items-top flex space-x-2">
      <Checkbox {...args} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms1" className={labelStyles}>
          Accept terms and conditions
        </Label>
        <p className="text-muted-foreground text-sm">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
  args: {
    id: "terms1",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms-disabled" className={labelStyles}>
        Accept terms and conditions
      </Label>
    </div>
  ),
  args: {
    disabled: true,
    id: "terms-disabled",
  },
};

export const DisabledChecked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms-disabled-checked" className={labelStyles}>
        Accept terms and conditions
      </Label>
    </div>
  ),
  args: {
    disabled: true,
    defaultChecked: true,
    id: "terms-disabled-checked",
  },
};

export const Required: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="terms-required" className={labelStyles}>
        Accept terms and conditions{" "}
        <span className="text-red-500" aria-hidden="true">
          *
        </span>
      </Label>
    </div>
  ),
  args: {
    required: true,
    id: "terms-required",
    "aria-required": true,
  },
};
