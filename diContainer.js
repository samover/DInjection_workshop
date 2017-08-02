/**
 * diContainer.config.js
 * src/config
 *
 */

const awilix = require('awilix');

const di = awilix.createContainer();

di.loadModules([
    'src/**/*.js',
], {
  formatName: 'camelCase',
  registrationOptions: {
    lifetime: awilix.Lifetime.SINGLETON,
  },
});

module.exports = di;
