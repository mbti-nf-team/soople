const path = require('path');
const tsconfigPaths = require('vite-tsconfig-paths').default;

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
    config.plugins.push(
      tsconfigPaths({
        projects: [path.resolve(path.dirname(__dirname), 'tsconfig.json')],
      })
    );
    
    return config;
  },
  babel: async (options) => {
    options.plugins.push("babel-plugin-inline-react-svg");

    return options;
  },
}
