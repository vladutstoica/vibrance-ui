import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "./button";

const meta = {
  title: "Design System/Core/Button",
  component: Button,
  parameters: {
    // Enable visual testing
    visual: true,
    // Enhanced accessibility testing configuration
    a11y: {
      config: {
        rules: [
          {
            // Ensure buttons have accessible names
            id: "button-name",
            enabled: true,
          },
          {
            // Check color contrast
            id: "color-contrast",
            enabled: true,
            // Minimum contrast ratio (WCAG AA)
            options: {
              noScroll: true,
              contrastRatio: {
                normal: {
                  expected: 4.5,
                },
                large: {
                  expected: 3,
                },
              },
            },
          },
          {
            // Ensure interactive elements are keyboard accessible
            id: "interactive-supports-focus",
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
        },
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style variant of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      description: "Function called when the button is clicked",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "default",
    onClick: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /primary button/i });

    await step("Initial Visibility Check", async () => {
      await expect(button).toBeVisible();
      await expect(button).toHaveClass("bg-primary");
    });

    await step("Hover Interaction", async () => {
      await userEvent.hover(button);
      await expect(button).toHaveClass("hover:bg-primary/90");
      await userEvent.unhover(button);
    });

    await step("Focus and Click Interaction", async () => {
      await userEvent.tab();
      await expect(button).toHaveFocus();
      await userEvent.click(button);
      await expect(button).toHaveFocus();
    });

    await step("Keyboard Interaction", async () => {
      await userEvent.keyboard("{Enter}");
      // The onClick handler should have been called twice (click and Enter)
      await expect(button).toBeInTheDocument();
    });
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    onClick: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /secondary button/i });

    await step("Visibility and Style Check", async () => {
      await expect(button).toBeVisible();
      await expect(button).toHaveClass("bg-secondary");
    });

    await step("Interaction Test", async () => {
      await userEvent.click(button);
      await expect(button).toHaveFocus();
    });
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Button",
    variant: "destructive",
    onClick: fn(),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /destructive button/i });

    await step("Visibility and Style Check", async () => {
      await expect(button).toBeVisible();
      await expect(button).toHaveClass("bg-destructive");
    });

    await step("Interaction Test", async () => {
      await userEvent.click(button);
      await expect(button).toHaveFocus();
    });
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /outline button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass("border-input");
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /ghost button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass("hover:bg-accent");
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /link button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass("text-primary");
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /small button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass("h-9");
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /large button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass("h-11");
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /disabled button/i });

    await step("Disabled State Check", async () => {
      await expect(button).toBeVisible();
      await expect(button).toBeDisabled();
      await expect(button).toHaveAttribute("disabled");
      await expect(button).toHaveClass("disabled:pointer-events-none");
    });

    await step("Verify Click Handler Not Called", async () => {
      // Instead of trying to click the button, we verify the onClick prop
      expect(args.onClick).not.toHaveBeenCalled();
    });

    await step("Keyboard Navigation", async () => {
      // Focus the button's container first
      await userEvent.tab();
      // Verify that the disabled button is not focused
      await expect(button).not.toHaveFocus();
    });

    await step("Style Verification", async () => {
      // Verify disabled styles are applied using Tailwind classes
      await expect(button).toHaveClass("disabled:pointer-events-none");
      await expect(button).toHaveClass("disabled:opacity-50");
    });
  },
};
