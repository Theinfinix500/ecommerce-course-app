const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

export default defineConfig({
  e2e: {
    async setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    video: false,
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 10000,
    excludeSpecPattern: ['*.js', '*.md'],
    specPattern: '**/*.feature',
  },
});
