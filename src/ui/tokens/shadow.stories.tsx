import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

const meta: Meta<{
  shadow: {
    name: string;
    value: string;
  }[];
}> = {
  title: "Design Tokens/Shadow",
  argTypes: {},
  args: {
    shadow: Object.keys(fullConfig.theme.boxShadow).map((name) => {
      const value =
        fullConfig.theme.boxShadow[
          name as keyof typeof fullConfig.theme.boxShadow
        ];
      return {
        name,
        value,
      };
    }),
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
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Preview</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {args.shadow.map(({ name, value }) => {
          const style = window.getComputedStyle(document.body);
          const variable = value.match(/var\(([^)]+),/)?.[1] ?? "";
          const resolved = style.getPropertyValue(variable);
          const resolvedValue = value
            .replace(/var\(--(.*?)\)/, resolved)
            .replace(/,/g, ",\n")
            .replace(/\n\n/g, "\n");
          return (
            <tr key={name} className="border-b bg-card">
              <td className="px-6 py-4">{name}</td>
              <td className="hidden whitespace-pre-line px-6 py-4 sm:table-cell">
                {resolvedValue}
              </td>
              <td className="px-6 py-4">
                <div
                  className="size-20 rounded border bg-background"
                  style={{ boxShadow: value }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Core: Story = {};
