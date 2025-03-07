import type { Meta, StoryObj } from "@storybook/react";
import {
  Download,
  File,
  FileArchive,
  FileImage,
  FileText,
  FileVideo,
  Folder,
  FolderOpen,
  Globe,
  Presentation,
} from "lucide-react";
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

// Helper function to get icon based on file extension
const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return <FileText className="h-4 w-4 text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FileImage className="h-4 w-4 text-blue-500" />;
    case "mp4":
    case "mov":
    case "avi":
      return <FileVideo className="h-4 w-4 text-purple-500" />;
    case "zip":
    case "rar":
    case "7z":
      return <FileArchive className="h-4 w-4 text-yellow-500" />;
    case "ppt":
    case "pptx":
      return <Presentation className="h-4 w-4 text-orange-500" />;
    case "doc":
    case "docx":
      return <FileText className="h-4 w-4 text-blue-600" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
};

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
              { id: "1.1.1.1", name: "Report Q1.pdf", type: "file" },
              { id: "1.1.1.2", name: "Presentation.pptx", type: "file" },
            ],
          },
          {
            id: "1.1.2",
            name: "Personal",
            type: "department",
            children: [
              { id: "1.1.2.1", name: "Photos", type: "folder" },
              { id: "1.1.2.2", name: "Resume.docx", type: "file" },
            ],
          },
        ],
      },
      {
        id: "1.2",
        name: "Downloads",
        type: "store",
        children: [
          { id: "1.2.1", name: "Software.zip", type: "file" },
          { id: "1.2.2", name: "Movie.mp4", type: "file" },
        ],
      },
    ],
  },
];

const sampleDataWithChecks: TreeViewItem[] = [
  {
    id: "1",
    name: "Root",
    type: "region",
    checked: true,
    children: [
      {
        id: "1.1",
        name: "Documents",
        type: "store",
        checked: true,
        children: [
          {
            id: "1.1.1",
            name: "Work",
            type: "department",
            checked: true,
            children: [
              {
                id: "1.1.1.1",
                name: "Report Q1.pdf",
                type: "file",
                checked: true,
              },
              {
                id: "1.1.1.2",
                name: "Presentation.pptx",
                type: "file",
                checked: true,
              },
            ],
          },
          {
            id: "1.1.2",
            name: "Personal",
            type: "department",
            checked: false,
            children: [
              { id: "1.1.2.1", name: "Photos", type: "folder", checked: false },
              {
                id: "1.1.2.2",
                name: "Resume.docx",
                type: "file",
                checked: false,
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        name: "Downloads",
        type: "store",
        checked: false,
        children: [
          { id: "1.2.1", name: "Software.zip", type: "file", checked: false },
          { id: "1.2.2", name: "Movie.mp4", type: "file", checked: false },
        ],
      },
    ],
  },
];

const customIconMap = {
  region: <Globe className="h-4 w-4 text-purple-500" />,
  store: <Folder className="h-4 w-4 text-blue-500" />,
  department: <FolderOpen className="h-4 w-4 text-green-500" />,
  folder: <Folder className="h-4 w-4 text-blue-500" />,
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
  render: () => {
    const getIcon = React.useMemo(
      () => (item: TreeViewItem) => {
        if (item.type === "file") {
          return getFileIcon(item.name);
        }
        return customIconMap[item.type];
      },
      [],
    );

    return <TreeView data={sampleData} getIcon={getIcon} />;
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [data, setData] = React.useState(() => sampleDataWithChecks);
    const getIcon = React.useMemo(
      () => (item: TreeViewItem) => {
        if (item.type === "file") {
          return getFileIcon(item.name);
        }
        return customIconMap[item.type];
      },
      [],
    );

    const handleCheckChange = React.useCallback(
      (item: TreeViewItem, checked: boolean) => {
        setData((prev) => {
          const newData = [...prev];
          const updateItem = (items: TreeViewItem[]) => {
            for (const node of items) {
              if (node.id === item.id) {
                node.checked = checked;
                if (node.children) {
                  updateChildren(node.children, checked);
                }
                return;
              }
              if (node.children) {
                updateItem(node.children);
              }
            }
          };

          const updateChildren = (
            children: TreeViewItem[],
            checked: boolean,
          ) => {
            for (const child of children) {
              child.checked = checked;
              if (child.children) {
                updateChildren(child.children, checked);
              }
            }
          };

          updateItem(newData);
          return newData;
        });
      },
      [],
    );

    return (
      <TreeView
        data={data}
        getIcon={getIcon}
        showCheckboxes
        checkboxLabels={{
          check: "Select All",
          uncheck: "Deselect All",
        }}
        onCheckChange={handleCheckChange}
      />
    );
  },
};

export const WithCustomIcons: Story = {
  render: () => {
    const getIcon = React.useMemo(
      () => (item: TreeViewItem) => {
        if (item.type === "file") {
          return getFileIcon(item.name);
        }
        return customIconMap[item.type];
      },
      [],
    );

    return <TreeView data={sampleData} getIcon={getIcon} />;
  },
};

export const WithSearch: Story = {
  render: () => {
    const getIcon = React.useMemo(
      () => (item: TreeViewItem) => {
        if (item.type === "file") {
          return getFileIcon(item.name);
        }
        return customIconMap[item.type];
      },
      [],
    );

    return (
      <TreeView
        data={sampleData}
        getIcon={getIcon}
        searchPlaceholder="Search files and folders..."
      />
    );
  },
};

export const WithContextMenu: Story = {
  render: () => {
    const getIcon = React.useMemo(
      () => (item: TreeViewItem) => {
        if (item.type === "file") {
          return getFileIcon(item.name);
        }
        return customIconMap[item.type];
      },
      [],
    );

    return (
      <TreeView
        data={sampleData}
        getIcon={getIcon}
        menuItems={menuItems}
        onAction={(action, items) => {
          console.log(`Action ${action} triggered on:`, items);
        }}
      />
    );
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [data, setData] = React.useState(() => sampleData);
    const getIcon = React.useMemo(
      () => (item: TreeViewItem) => {
        if (item.type === "file") {
          return getFileIcon(item.name);
        }
        return customIconMap[item.type];
      },
      [],
    );

    const handleCheckChange = React.useCallback(
      (item: TreeViewItem, checked: boolean) => {
        setData((prev) => {
          const newData = [...prev];
          const updateItem = (items: TreeViewItem[]) => {
            for (const node of items) {
              if (node.id === item.id) {
                node.checked = checked;
                if (node.children) {
                  updateChildren(node.children, checked);
                }
                return;
              }
              if (node.children) {
                updateItem(node.children);
              }
            }
          };

          const updateChildren = (
            children: TreeViewItem[],
            checked: boolean,
          ) => {
            for (const child of children) {
              child.checked = checked;
              if (child.children) {
                updateChildren(child.children, checked);
              }
            }
          };

          updateItem(newData);
          return newData;
        });
      },
      [],
    );

    return (
      <TreeView
        data={data}
        getIcon={getIcon}
        showCheckboxes
        showExpandAll
        menuItems={menuItems}
        searchPlaceholder="Search files and folders..."
        onCheckChange={handleCheckChange}
        onAction={(action, items) => {
          console.log(`Action ${action} triggered on:`, items);
        }}
      />
    );
  },
};
