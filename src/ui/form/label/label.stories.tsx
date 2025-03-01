import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "../checkbox/checkbox";
import { Input } from "../input/input";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Form/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      description: "The id of the form control this label is associated with",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Your email address</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required-email">
        Email <span className="text-red-500">*</span>
      </Label>
      <Input type="email" id="required-email" placeholder="Email" required />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
      <p className="text-muted-foreground text-sm">
        Upload a picture to your profile.
      </p>
    </div>
  ),
};
