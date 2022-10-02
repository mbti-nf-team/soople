/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import admin from 'firebase-admin';

export default defineConfig({
  projectId: 'oj7cg1',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);
    },
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
  },
});
