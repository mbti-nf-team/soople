/* eslint-disable no-proto */
import { loadItem, removeItem, saveItem } from './storage';

describe('storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    window.localStorage = {
      ...window.localStorage,
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  describe('saveItem', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'setItem');
    });

    const value = {
      key: 'value',
    };

    it('localStorage setItem이 호출되어야만 한다', () => {
      saveItem('key', value);

      expect(window.localStorage.setItem).toBeCalledWith('key', JSON.stringify(value));
    });
  });

  describe('loadItem', () => {
    context('Error가 발생하지 않은 경우', () => {
      const spyOnGetItem = jest.spyOn(window.localStorage.__proto__, 'getItem');

      beforeEach(() => {
        spyOnGetItem.mockReset();
      });

      context('key값에 대한 item이 존재하지 않는 경우', () => {
        spyOnGetItem.mockReturnValueOnce(null);

        it('localStorage getItem이 호출되어야만 한다', () => {
          loadItem('key');

          expect(window.localStorage.getItem).toBeCalledWith('key');
        });
      });

      context('key값에 대한 item이 존재하는 경우', () => {
        spyOnGetItem.mockReturnValueOnce('test');

        it('localStorage getItem이 호출되어야만 한다', () => {
          loadItem('key');

          expect(window.localStorage.getItem).toBeCalledWith('key');
        });
      });

      context('window가 undefined인 경우', () => {
        const windowSpy = jest.spyOn(window, 'window', 'get') as any;

        afterEach(() => {
          windowSpy.mockRestore();
        });

        it('null를 반환해야만 한다', () => {
          windowSpy.mockImplementation(() => undefined);

          const result = loadItem('key');

          expect(result).toBeNull();
        });
      });
    });

    context('Error가 발생한 경우', () => {
      const spyOnParse = jest.spyOn(JSON, 'parse').mockImplementationOnce(() => new Error('error'));

      it('null을 반환해야만 한다', () => {
        const result = loadItem('key');

        expect(spyOnParse).toBeCalled();
        expect(result).toBeNull();
      });
    });
  });

  describe('removeItem', () => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem');

    it('localStorage removeItem이 호출되어야만 한다', () => {
      removeItem('key');

      expect(window.localStorage.removeItem).toBeCalledWith('key');
    });
  });
});
