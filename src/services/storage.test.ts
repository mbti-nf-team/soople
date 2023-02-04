/* eslint-disable no-proto */
import { loadItem, removeItem, saveItem } from './storage';

describe('storage', () => {
  describe('saveItem', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'setItem');
    });

    const value = {
      key: 'value',
    };

    it('localStorage setItem이 호출되어야만 한다', () => {
      saveItem('key', value);

      expect(window.localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify(value));
    });
  });

  describe('loadItem', () => {
    const spyOnGetItem = jest.spyOn(window.localStorage.__proto__, 'getItem');
    const spyOnJsonParse = jest.spyOn(JSON, 'parse');

    afterEach(() => {
      spyOnGetItem.mockReset();
      spyOnJsonParse.mockReset();
    });

    context('Error가 발생하지 않은 경우', () => {
      context('key값에 대한 item이 존재하지 않는 경우', () => {
        beforeEach(() => {
          spyOnGetItem.mockReturnValueOnce(null);
          spyOnJsonParse.mockReturnValueOnce('');
        });

        it('localStorage getItem이 호출되어야만 한다', () => {
          const result = loadItem('key');

          expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
          expect(result).toBe('');
        });
      });

      context('key값에 대한 item이 존재하는 경우', () => {
        const value = 'test';

        beforeEach(() => {
          spyOnGetItem.mockReturnValueOnce(value);
          spyOnJsonParse.mockReturnValueOnce(value);
        });

        it('localStorage getItem이 호출되어야만 한다', () => {
          const result = loadItem('key');

          expect(window.localStorage.getItem).toHaveBeenCalledWith('key');
          expect(result).toBe(value);
        });
      });

      context('window가 undefined인 경우', () => {
        const windowSpy = jest.spyOn(window, 'window', 'get') as jest.Mock;

        beforeEach(() => {
          windowSpy.mockImplementationOnce(() => undefined);
        });

        afterEach(() => {
          windowSpy.mockRestore();
        });

        it('null를 반환해야만 한다', () => {
          const result = loadItem('key');

          expect(result).toBeNull();
        });
      });
    });

    context('Error가 발생한 경우', () => {
      beforeEach(() => {
        spyOnGetItem.mockReturnValue(new Error('error'));
      });

      it('null을 반환해야만 한다', () => {
        const result = loadItem('key');

        expect(result).toBeNull();
      });
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'removeItem');
    });

    it('localStorage removeItem이 호출되어야만 한다', () => {
      removeItem('key');

      expect(window.localStorage.removeItem).toHaveBeenCalledWith('key');
    });
  });
});
