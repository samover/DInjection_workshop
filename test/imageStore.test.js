/**
 * imageStore.test.js
 * test/utils/imageStore
 *
 * Created by samover on 24/07/2017.
 */

const { imageStore } = diContainer.cradle;

imageStore.storageProvider = {
  testProvider: {},
};

describe('src/utils/imageStore', () => {
  it('throws an error when storageProvider does not exist', () => {
    try {
      imageStore.add('unexistingProvider', { atrr_1: 'hello' });
      throw new Error();
    } catch (e) {
      expect(e).to.match(/does not exist/);
    }
  });
  it('throws an error when method "add" does not exist on storageProvider', () => {
    try {
      imageStore.add('testProvider', { atrr_1: 'hello' });
      throw new Error();
    } catch (e) {
      expect(e).to.match(/Method add does not exist/);
    }
  });
  it('throws an error when method "get" does not exist on storageProvider', () => {
    try {
      imageStore.get('testProvider', { atrr_1: 'hello' });
      throw new Error();
    } catch (e) {
      expect(e).to.match(/Method find does not exist/);
    }
  });
  it('throws an error when method "delete" does not exist on storageProvider', () => {
    try {
      imageStore.delete('testProvider', { atrr_1: 'hello' });
      throw new Error();
    } catch (e) {
      expect(e).to.match(/Method delete does not exist/);
    }
  });
  it('throws an error when method "update" does not exist on storageProvider', () => {
    try {
      imageStore.update('testProvider', { atrr_1: 'hello' });
      throw new Error();
    } catch (e) {
      expect(e).to.match(/Method update does not exist/);
    }
  });
  it('returns a resolved promise when provider has method add', async () => {
    imageStore.storageProvider.testProvider.add = () => Promise.resolve();
    await expect(imageStore.add('testProvider', { atrr_1: 'hello' }))
      .to.eventually.be.undefined;
  });
  it('returns a resolved promise when provider has method find', async () => {
    imageStore.storageProvider.testProvider.find = () => Promise.resolve();
    await expect(imageStore.get('testProvider', { atrr_1: 'hello' }))
      .to.eventually.be.undefined;
  });
  it('returns a resolved promise when provider has method update', async () => {
    imageStore.storageProvider.testProvider.update = () => Promise.resolve();
    await expect(imageStore.update('testProvider', { atrr_1: 'hello' }))
      .to.eventually.be.undefined;
  });
  it('returns a resolved promise when provider has method delete', async () => {
    imageStore.storageProvider.testProvider.delete = () => Promise.resolve();
    await expect(imageStore.delete('testProvider', { atrr_1: 'hello' }))
      .to.eventually.be.undefined;
  });
});
