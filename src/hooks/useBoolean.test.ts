import { act, renderHook } from '@testing-library/react';

import useBoolean from './useBoolean';

describe('useBoolean', () => {
  const useBooleanHook = () => renderHook(() => useBoolean(given.initialValue));

  context('초기 값이 존재하는 경우', () => {
    given('initialValue', () => true);

    it('초기값을 반환해야만 한다', () => {
      const { result } = useBooleanHook();

      expect(result.current[0]).toBeTruthy();
      expect(result.current[1]).toBeInstanceOf(Function);
      expect(result.current[2]).toBeInstanceOf(Function);
      expect(result.current[3]).toBeInstanceOf(Function);
    });
  });

  context('초기 값이 존재하지 않는 경우', () => {
    it('false를 반환해야만 한다', () => {
      const { result } = useBooleanHook();

      expect(result.current[0]).toBeFalsy();
      expect(result.current[1]).toBeInstanceOf(Function);
      expect(result.current[2]).toBeInstanceOf(Function);
      expect(result.current[3]).toBeInstanceOf(Function);
    });
  });

  context('반환되는 두번째 배열을 호출하면', () => {
    it('상태값은 true로 변해야만 한다', () => {
      const { result } = useBooleanHook();
      const [, setTrue] = result.current;

      expect(result.current[0]).toBe(false);

      act(() => {
        setTrue();
      });

      expect(result.current[0]).toBe(true);
    });
  });

  context('반환되는 세번째 배열을 호출하면', () => {
    given('initialValue', () => true);

    it('상태값은 false로 변해야만 한다', () => {
      const { result } = useBooleanHook();
      const [, , setFalse] = result.current;

      expect(result.current[0]).toBe(true);

      act(() => {
        setFalse();
      });

      expect(result.current[0]).toBe(false);
    });
  });

  describe('반환되는 네번째 배열을 호출한다', () => {
    it('상태값 반대되는 상태로 변해야만 한다 (true일 경우 false, false일 경우 true)', () => {
      const { result } = useBooleanHook();
      const [, , , onToggle] = result.current;

      expect(result.current[0]).toBe(false);

      act(() => {
        onToggle();
      });

      expect(result.current[0]).toBe(true);
    });
  });
});
