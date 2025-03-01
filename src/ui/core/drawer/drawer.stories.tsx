import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

/**
 * A drawer component for React.
 */
const meta = {
  title: "Design System/Core/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="rounded bg-primary px-4 py-2 text-primary-foreground">
            Submit
          </button>
          <DrawerClose>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="hover:underline">Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the drawer.
 */
export const Default: Story = {} as Story;
