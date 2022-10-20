import { PropsWithChildren, ReactElement } from 'react';

import useIsMounted from '@/hooks/useIsMounted';

function ClientOnly({ children }: PropsWithChildren): ReactElement | null {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <>{children}</>
  );
}

export default ClientOnly;
