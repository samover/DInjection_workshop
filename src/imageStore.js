/**
 * imageStore.js
 * src/utils/imageStore
 *
 * Created by samover on 24/07/2017.
 */

const S3Store = require('./s3Store');
const JastecStore = require('./jastecStore');

module.exports = class ImageStore {
  constructor() {
    this.storageProvider = {
      S3: new S3Store(),
      JASTEC: new JastecStore(),
    };
  }

  _verifyRequest({ type, method }) {
    if (!this.storageProvider[type]) {
      throw new Error(`StorageProvider ${type} does not exist`);
    }
    if (typeof this.storageProvider[type][method] !== 'function') {
      throw new Error(`Method ${method} does not exist on storageProvider ${type}`);
    }
  }

  add(type, attributes) {
    this._verifyRequest({ type, method: 'add' });
    return this.storageProvider[type].add(attributes);
  }

  get(type, attributes) {
    this._verifyRequest({ type, method: 'find' });
    return this.storageProvider[type].find(attributes);
  }

  delete(type, attributes) {
    this._verifyRequest({ type, method: 'delete' });
    return this.storageProvider[type].delete(attributes);
  }

  update(type, attributes) {
    this._verifyRequest({ type, method: 'update' });
    return this.storageProvider[type].update(attributes);
  }
};
