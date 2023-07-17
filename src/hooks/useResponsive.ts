import { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useIsomorphicLayoutEffect } from '@nft-team/react';

import { breakpoint } from '@/styles/responsive';

const { mobile, tablet } = breakpoint;

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: mobile,
  });

  const isTablet = useMediaQuery({
    minWidth: mobile,
    maxWidth: tablet,
  });

  const isDesktop = useMediaQuery({
    minWidth: tablet,
  });

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return useMemo(() => ({
    isDesktop: isClient ? isDesktop : true,
    isTablet: isClient ? isTablet : false,
    isMobile: isClient ? isMobile : false,
    isClient,
  }), [isClient, isDesktop, isTablet, isMobile]);
}

export default useResponsive;
