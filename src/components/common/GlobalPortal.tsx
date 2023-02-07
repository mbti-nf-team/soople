import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import useIsMounted from '@/hooks/useIsMounted';

interface Props {
  elementId?: string;
}

function GlobalPortal({ elementId = 'portal-container', children }: PropsWithChildren<Props>) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const portalRoot = document.getElementById(elementId);

  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(children, portalRoot);
}

export default GlobalPortal;
