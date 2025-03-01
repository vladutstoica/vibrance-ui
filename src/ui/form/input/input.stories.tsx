import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Label } from "../label/label";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Design System/Form/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "The type of the input field",
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "search",
        "tel",
        "url",
        "file",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    disabled: {
      description: "Whether the input is disabled",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      description: "Placeholder text for the input",
      control: "text",
    },
  },
  decorators: [
    (Story, context) => (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor={`input-${context.name}`}>{context.name}</Label>
        {Story({ args: { ...context.args, id: `input-${context.name}` } })}
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello World",
    "aria-label": "Text input with value",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const File: Story = {
  args: {
    type: "file",
    accept: "image/*",
  },
};

export const WithError: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="input-error">Email</Label>
      <Input
        id="input-error"
        type="email"
        placeholder="Enter your email"
        className="border-red-500 focus-visible:ring-red-500"
        aria-describedby="email-error"
        {...args}
      />
      <p id="email-error" className="text-red-500 text-sm">
        Please enter a valid email address
      </p>
    </div>
  ),
};
