// https://github.com/GoogleChrome/lighthouse-ci/blob/v0.4.1/docs/configuration.md#configuration-file,
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      url: ['http://localhost:3000'],
      numberOfRuns: 5,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    // NOTE - https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#preset
    assert: {
      assertions: {
        'categories:performance': ['warn', {
          minScore: 0.7,
        }],
        'categories:accessibility': ['warn', {
          minScore: 0.7,
        }],
      },
    },
  },
};
