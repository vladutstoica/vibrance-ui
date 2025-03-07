import type { Meta, StoryObj } from "@storybook/react";
import { Download, File, Folder, FolderOpen, Globe } from "lucide-react";
import React from "react";
import TreeView from "./tree-view";
import type { TreeViewItem } from "./tree-view";

const meta: Meta<typeof TreeView> = {
  title: "Design System/Application/Blocks/TreeView",
  component: TreeView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const sampleData: TreeViewItem[] = [
  {
    id: "1",
    name: "Root",
    type: "region",
    children: [
      {
        id: "1.1",
        name: "Documents",
        type: "store",
        children: [
          {
            id: "1.1.1",
            name: "Work",
            type: "department",
            children: [
              { id: "1.1.1.1", name: "Report Q1.pdf", type: "item" },
              { id: "1.1.1.2", name: "Presentation.pptx", type: "item" },
            ],
          },
          {
            id: "1.1.2",
            name: "Personal",
            type: "department",
            children: [
              { id: "1.1.2.1", name: "Photos", type: "item" },
              { id: "1.1.2.2", name: "Resume.docx", type: "item" },
            ],
          },
        ],
      },
      {
        id: "1.2",
        name: "Downloads",
        type: "store",
        children: [
          { id: "1.2.1", name: "Software.zip", type: "item" },
          { id: "1.2.2", name: "Movie.mp4", type: "item" },
        ],
      },
    ],
  },
];

const customIconMap = {
  region: <Globe className="h-4 w-4 text-purple-500" />,
  store: <Folder className="h-4 w-4 text-blue-500" />,
  department: <FolderOpen className="h-4 w-4 text-green-500" />,
  item: <File className="h-4 w-4 text-orange-500" />,
};

const menuItems = [
  {
    id: "download",
    label: "Download",
    icon: <Download className="h-4 w-4" />,
    action: (items) => console.log("Downloading:", items),
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const WithCheckboxes: Story = {
  args: {
    data: sampleData,
    showCheckboxes: true,
    onCheckChange: (item, checked) => {
      console.log(`Item ${item.name} ${checked ? "checked" : "unchecked"}`);
    },
  },
};

export const WithCustomIcons: Story = {
  args: {
    data: sampleData,
    iconMap: customIconMap,
  },
};

export const WithSearch: Story = {
  args: {
    data: sampleData,
    iconMap: customIconMap,
    searchPlaceholder: "Search files and folders...",
  },
};

export const WithContextMenu: Story = {
  args: {
    data: sampleData,
    iconMap: customIconMap,
    menuItems: menuItems,
    onAction: (action, items) => {
      console.log(`Action ${action} triggered on:`, items);
    },
  },
};

export const FullFeatured: Story = {
  args: {
    data: sampleData,
    showCheckboxes: true,
    showExpandAll: true,
    iconMap: customIconMap,
    menuItems: menuItems,
    searchPlaceholder: "Search files and folders...",
    onCheckChange: (item, checked) => {
      console.log(`Item ${item.name} ${checked ? "checked" : "unchecked"}`);
    },
    onAction: (action, items) => {
      console.log(`Action ${action} triggered on:`, items);
    },
  },
};
