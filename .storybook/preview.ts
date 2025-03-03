import type { Preview } from "@storybook/react";
import '../src/tailwind.css';
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Use an element ID that matches our test-runner config
      element: '#storybook-root',
      manual: false,
      config: {
        rules: [
          {
            // Ensure buttons have sufficient contrast
            id: 'color-contrast',
            enabled: true,
            options: {
              noScroll: true,
            },
          },
          {
            // Ensure interactive elements are keyboard accessible
            id: 'interactive-supports-focus',
            enabled: true,
          },
          {
            // Check for ARIA attributes
            id: 'aria-valid',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction', [
            'Introduction',
            'Getting Started',
            'Design Principles',
          ],
          'Design System', [
            'Core',
            'Fields',
            'Application',
            'Marketing',
            'Ecommerce',
          ],
          'Examples',
        ],
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
      withThemeByClassName({
        themes: {
          light: "",
          dark: "dark"
        },
        defaultTheme: "light"
      })
  ]
};

export default preview; 