const { resolve } = require('path');
const { mergeConfig } = require("vite");

module.exports = {
  staticDirs: ['../public'],
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": resolve(__dirname, "/src"),
        },
      },
      // NOTE - https://github.com/storybookjs/storybook/issues/18920
      define: {
        "process.env": {},
      },
    });
  },
}
