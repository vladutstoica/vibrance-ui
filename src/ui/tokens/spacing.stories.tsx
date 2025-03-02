import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

const meta: Meta<{
  scale: {
    name: string;
    size: string;
    pixels: number;
  }[];
}> = {
  title: "Design Tokens/Padding",
  argTypes: {
    scale: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    scale: Object.keys(fullConfig.theme.spacing)
      .map((name) => {
        const value =
          fullConfig.theme.spacing[
            name as keyof typeof fullConfig.theme.spacing
          ];
        return {
          name,
          size: value,
          pixels:
            Number.parseFloat(value) * (String(value).endsWith("rem") ? 16 : 1),
        };
      })
      .sort((a, b) => a.pixels - b.pixels),
  },
  render: (args) => (
    <table className="w-full table-auto text-left text-foreground text-sm rtl:text-right">
      <thead className="bg-muted text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="hidden px-6 py-3 sm:table-cell">
            Size
          </th>
          <th scope="col" className="hidden px-6 py-3 sm:table-cell">
            Pixel
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Preview</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {args.scale.map(({ name, size, pixels }) => (
          <tr key={name} className="border-b bg-card">
            <td className="px-6 py-4">{name}</td>
            <td className="hidden px-6 py-4 sm:table-cell">{size}</td>
            <td className="hidden px-6 py-4 sm:table-cell">{pixels}px</td>
            <td className="px-6 py-4">
              <div className="border bg-muted">
                <div className="h-4 bg-primary" style={{ width: size }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Core: Story = {};
