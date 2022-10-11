import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  elementId?: string;
}

function ModalPortal({ elementId = 'portal-container', children }: PropsWithChildren<Props>) {
  const portalRoot = document.getElementById(elementId);

  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(children, portalRoot);
}

export default ModalPortal;
