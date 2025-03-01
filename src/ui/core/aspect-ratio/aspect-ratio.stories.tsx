import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { AspectRatio } from "./aspect-ratio";

/**
 * Displays content within a desired ratio.
 */
const meta: Meta<typeof AspectRatio> = {
  title: "Design System/Core/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => (
    <AspectRatio {...args} className="bg-slate-50 dark:bg-slate-800">
      {/*TODO: use a <Image /> component*/}
      <img
        src="https://placehold.co/1000"
        alt="Placeholder Alt Text"
        className="rounded-md object-cover"
      />
    </AspectRatio>
  ),
  decorators: [
    (Story) => (
      <div className="w-1/2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the aspect ratio.
 */
export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
};

/**
 * Use the `1:1` aspect ratio to display a square image.
 */
export const Square: Story = {
  args: {
    ratio: 1,
  },
};

/**
 * Use the `4:3` aspect ratio to display a landscape image.
 */
export const Landscape: Story = {
  args: {
    ratio: 4 / 3,
  },
};

/**
 * Use the `2.35:1` aspect ratio to display a cinemascope image.
 */
export const Cinemascope: Story = {
  args: {
    ratio: 2.35,
  },
};
