/**
 * imageStore.js
 * src/utils/imageStore
 *
 * Created by samover on 24/07/2017.
 */

module.exports = class ImageStore {
  constructor({ s3Store, jastecStore }) {
    this.storageProvider = {
      S3: s3Store,
      JASTEC: jastecStore,
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
