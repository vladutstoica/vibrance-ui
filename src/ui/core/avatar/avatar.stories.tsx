import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "Design System/Core/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://placehold.co/1" alt="Avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the avatar.
 */
export const Default: Story = {};
