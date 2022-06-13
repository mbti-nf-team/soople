/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
  },
});
