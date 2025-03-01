import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Label } from "../label/label";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
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

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  decorators: [
    (Story) => (
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms1"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
          <p className="text-muted-foreground text-sm">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    ),
  ],
  args: {
    id: "terms",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    id: "terms-disabled",
  },
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" disabled />
        <Label
          htmlFor="terms2"
          className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </Label>
      </div>
    ),
  ],
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    id: "terms-disabled-checked",
  },
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Story />
        <Label
          htmlFor="terms-disabled-checked"
          className="text-muted-foreground"
        >
          Accept terms and conditions
        </Label>
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    required: true,
    id: "terms-required",
  },
  decorators: [
    (Story) => (
      <div className="flex items-center space-x-2">
        <Story />
        <Label htmlFor="terms-required">
          Accept terms and conditions <span className="text-red-500">*</span>
        </Label>
      </div>
    ),
  ],
};
