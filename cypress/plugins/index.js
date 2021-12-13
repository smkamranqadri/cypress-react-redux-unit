const path = require('path');

const { startDevServer } = require('@cypress/webpack-dev-Server');

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  if (config.testingType === 'component') {
    /** @type import("webpack").Configuration */
    const webpackConfig = {
      resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
      mode: 'development',
      devtool: false,
      output: {
        publicPath: '/',
        chunkFilename: '[name].bundle.js',
      },
      // TODO: update with valid configuration for your components
      module: {
        rules: [
          {
            test: /\.(js|jsx|mjs|ts|tsx)$/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '.babel-cache'),
            },
          },
          {
            test: /\.(s(a|c)ss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
          },
        ],
      },
    };
    on('dev-server:start', (options) =>
      startDevServer({
        options,
        webpackConfig,
      })
    );
  }
};
