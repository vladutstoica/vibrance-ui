import type { Meta, StoryObj } from '@storybook/react';
import { SimpleButton } from './SimpleButton';

const meta = {
  title: 'Components/SimpleButton',
  component: SimpleButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SimpleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click Me',
  },
};

export const WithClick: Story = {
  args: {
    label: 'Click to Alert',
    onClick: () => alert('Button clicked!'),
  },
}; 