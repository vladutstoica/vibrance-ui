import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import { CookieConsent } from "./cookie-consent";

/**
 * A cookie consent banner that appears at the bottom of the page to inform users about cookie usage.
 * Comes in three variants: default, small, and minimal.
 */
const meta = {
  title: "Design System/Application/CookieConsent",
  component: CookieConsent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "small", "minimal"],
      control: { type: "radio" },
      description: "The visual style variant of the cookie consent banner",
    },
    mode: {
      control: "boolean",
      description:
        "Whether to show the banner even if consent was previously given",
    },
    onAcceptCallback: {
      action: "accepted",
      description: "Callback function when cookies are accepted",
    },
    onDeclineCallback: {
      action: "declined",
      description: "Callback function when cookies are declined",
    },
  },
  args: {
    variant: "default",
    mode: true, // Force display in docs
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="relative min-h-[400px] w-full">
      <CookieConsent {...args} />
    </div>
  ),
} satisfies Meta<typeof CookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default variant with full information and prominent buttons.
 */
export const Default: Story = {
  args: {
    variant: "default",
  },
};

/**
 * A more compact version with simplified content but still maintaining key information.
 */
export const Small: Story = {
  args: {
    variant: "small",
  },
};

/**
 * The most minimal version for less intrusive cookie consent.
 */
export const Minimal: Story = {
  args: {
    variant: "minimal",
  },
};

/**
 * Example showing the banner in forced display mode, regardless of previous consent.
 */
export const ForcedDisplay: Story = {
  args: {
    variant: "default",
    mode: true,
  },
};

/**
 * Example with custom callback handlers for accept and decline actions.
 */
export const WithCallbacks: Story = {
  args: {
    variant: "default",
    mode: true,
    onAcceptCallback: () => console.log("Cookies accepted"),
    onDeclineCallback: () => console.log("Cookies declined"),
  },
};
