/**
 * imageStore.js
 * src/utils/imageStore
 *
 * Created by samover on 24/07/2017.
 */

const S3Store = require('./s3Store');
const JastecStore = require('./jastecStore');

const storageProvider = {
  S3: new S3Store(),
  JASTEC: new JastecStore(),
};

function verifyRequest({ type, method }) {
  if (!storageProvider[type]) {
    throw new Error(`StorageProvider ${type} does not exist`);
  }
  if (typeof storageProvider[type][method] !== 'function') {
    throw new Error(`Method ${method} does not exist on storageProvider ${type}`);
  }
}

module.exports = {
  add: (type, attributes) => {
    verifyRequest({ type, method: 'add' });
    return this.storageProvider[type].add(attributes);
  },
  get: (type, attributes) => {
    verifyRequest({ type, method: 'find' });
    return this.storageProvider[type].find(attributes);
  },
  delete: (type, attributes) => {
    verifyRequest({ type, method: 'delete' });
    return this.storageProvider[type].delete(attributes);
  },
  update: (type, attributes) => {
    verifyRequest({ type, method: 'update' });
    return this.storageProvider[type].update(attributes);
  },
};

