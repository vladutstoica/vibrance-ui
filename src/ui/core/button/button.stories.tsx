import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { expect, within, userEvent } from '@storybook/test';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /primary button/i });

    // Test visibility and styles
    await expect(button).toBeVisible();
    await expect(button).toHaveClass('bg-primary');

    // Test interactions
    await userEvent.hover(button);
    await expect(button).toHaveClass('hover:bg-primary/90');

    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /secondary button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('bg-secondary');
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /destructive button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('bg-destructive');
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /outline button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('border-input');
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /ghost button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('hover:bg-accent');
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /link button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('text-primary');
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /small button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('h-9');
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /large button/i });

    await expect(button).toBeVisible();
    await expect(button).toHaveClass('h-11');
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });

    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
    await expect(button).toHaveClass('disabled:pointer-events-none');
  },
}; 