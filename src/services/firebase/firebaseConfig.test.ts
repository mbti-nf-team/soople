import firebaseConfig, { devConfig, prodConfig } from './firebaseConfig';

describe('config', () => {
  context('When ENV is Production', () => {
    it('should be prodConfig', () => {
      expect(firebaseConfig('production')).toBe(prodConfig);
    });
  });

  context('When ENV is Development', () => {
    it('should be devConfig', () => {
      expect(firebaseConfig('development')).toBe(devConfig);
    });
  });
});
