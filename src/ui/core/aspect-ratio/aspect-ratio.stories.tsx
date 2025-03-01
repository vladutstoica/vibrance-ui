import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Design System/Core/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      description: "The aspect ratio of the container",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "1/1" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Square: Story = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={1} className="bg-muted">
        <img
          src="https://placehold.co/500"
          alt="Placeholder Alt Text"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Landscape: Story = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="https://placehold.co/1600x900"
          alt="Placeholder Alt Text"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={3 / 4} className="bg-muted">
        <img
          src="https://placehold.co/300x400"
          alt="Placeholder Alt Text"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
