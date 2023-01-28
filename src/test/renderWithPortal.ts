/* eslint-disable import/no-extraneous-dependencies */
import { JSXElementConstructor, ReactElement } from 'react';

import { render } from '@testing-library/react';

const renderWithPortal = <P>(
  ui: ReactElement<P, string | JSXElementConstructor<P>>,
  elementId = 'portal-container',
) => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', elementId);

  return render(ui, {
    container: document.body.appendChild(portalContainer),
  });
};

export default renderWithPortal;
