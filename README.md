# Vibrance UI

## Development Setup

### Required Extensions

This project requires [Biome](https://biomejs.dev/) for formatting and linting. You must install the appropriate extension for your editor:

#### VS Code
- [Biome VS Code Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

> **Note**: The VS Code workspace is configured to require this extension. VS Code will prevent editing files until the extension is installed.

#### IntelliJ IDEA
- [Biome IntelliJ Plugin](https://plugins.jetbrains.com/plugin/21841-biome)

> **Note**: When opening the project in IntelliJ IDEA, you'll be notified about the required Biome plugin. Please install it for consistent code formatting and linting.

### Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Install the required extension for your editor (see above)
3. Biome will automatically format your code on save and provide linting feedback in real-time

### Editor Configuration

The project comes with pre-configured settings for both VS Code and IntelliJ IDEA:
- VS Code: Settings are automatically applied when you open the project
- IntelliJ IDEA: The Biome plugin will be suggested when you open the project 