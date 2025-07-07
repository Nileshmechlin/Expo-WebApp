const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  './assets/icon': path.resolve(__dirname, './emptyIconShim.js'),
};

module.exports = config;
