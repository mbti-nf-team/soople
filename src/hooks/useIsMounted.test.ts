import { renderHook } from '@testing-library/react';

import useIsMounted from './useIsMounted';

describe('useIsMounted', () => {
  const useIsMountedHook = () => renderHook(useIsMounted);

  it('mount가 된 경우 true를 반환해야만 한다', () => {
    const { result } = useIsMountedHook();

    expect(result.current).toBe(true);
  });
});
