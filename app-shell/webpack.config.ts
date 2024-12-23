import { container, DefinePlugin, EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');

const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:3000/',
    uniqueName: 'app-shell',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new Dotenv(),
    new container.ModuleFederationPlugin({
      shared: {
        '@angular/core': { eager: true, singleton: true },
        '@angular/common': { eager: true, singleton: true },
        '@angular/router': { eager: true, singleton: true },
        '@types/antd': { eager: true, singleton: true },
        vue: {
          eager: true,
          singleton: true,
        },
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom/client': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
