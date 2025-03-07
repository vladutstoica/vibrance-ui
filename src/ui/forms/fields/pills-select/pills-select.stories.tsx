import type { Meta, StoryObj } from "@storybook/react";
import { PillsSelect } from "./pills-select";

const meta: Meta<typeof PillsSelect> = {
  title: "Design System/Forms/Fields/PillsSelect",
  component: PillsSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PillsSelect>;

const colors = [
  { name: "red-500" },
  { name: "blue-500" },
  { name: "green-500" },
  { name: "yellow-500" },
  { name: "purple-500" },
  { name: "pink-500" },
  { name: "indigo-500" },
  { name: "gray-500" },
];

export const Default: Story = {
  args: {
    data: colors,
    placeholder: "Select colors...",
  },
};

export const WithDefaultValue: Story = {
  args: {
    data: colors,
    defaultValue: ["red-500", "blue-500"],
    placeholder: "Select colors...",
  },
};

const frameworks = [
  { name: "React", id: "react" },
  { name: "Vue", id: "vue" },
  { name: "Angular", id: "angular" },
  { name: "Svelte", id: "svelte" },
  { name: "Next.js", id: "nextjs" },
  { name: "Nuxt", id: "nuxt" },
  { name: "Remix", id: "remix" },
  { name: "Astro", id: "astro" },
];

export const WithIds: Story = {
  args: {
    data: frameworks,
    placeholder: "Select frameworks...",
  },
};

const sizes = [
  { name: "XS", value: "xs" },
  { name: "Small", value: "sm" },
  { name: "Medium", value: "md" },
  { name: "Large", value: "lg" },
  { name: "XL", value: "xl" },
  { name: "2XL", value: "2xl" },
  { name: "3XL", value: "3xl" },
];

export const WithValues: Story = {
  args: {
    data: sizes,
    placeholder: "Select sizes...",
  },
};
