import { loadItem, removeItem, saveItem } from '@/services/storage';

import { localStorageEffect } from './atomEffects';

jest.mock('@/services/storage');

describe('localStorageEffect', () => {
  const mockSetSelf = jest.fn();
  const mockOnSet = jest.fn();

  const saveLocalStorageValue = 'localStorageValue';
  const localStorageKey = 'localStorageKey';
  const newValue = 'newValue';

  beforeEach(() => {
    jest.clearAllMocks();

    mockOnSet.mockImplementation((cb) => cb(newValue, '', given.isReset));
    (loadItem as jest.Mock).mockReturnValue(saveLocalStorageValue);
  });

  const atomEffect = () => localStorageEffect(localStorageKey)({
    setSelf: mockSetSelf, onSet: mockOnSet,
  } as any);

  context('localStorage에 저장된 값이 존재하는 경우', () => {
    it('저장된 값과 함께 setSelf가 호출되어야만 한다', () => {
      atomEffect();

      expect(mockSetSelf).toHaveBeenCalledWith(saveLocalStorageValue);
    });
  });

  describe('onSet의 콜백 함수가 호출된다', () => {
    context('콜백 함수의 세번째 파라미터인 isReset이 true인 경우', () => {
      given('isReset', () => true);

      it('해당 키와 함께 removeItem이 호출되어야만 한다', () => {
        atomEffect();

        expect(removeItem).toHaveBeenCalledWith(localStorageKey);
      });
    });

    context('콜백 함수의 세번째 파라미터인 isReset이 false인 경우', () => {
      given('isReset', () => false);

      it('해당 키와 값과 함께 saveItem이 호출되어야만 한다', () => {
        atomEffect();

        expect(saveItem).toHaveBeenCalledWith(localStorageKey, newValue);
      });
    });
  });
});
