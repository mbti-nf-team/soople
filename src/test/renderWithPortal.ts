/* eslint-disable import/no-extraneous-dependencies */
import { JSXElementConstructor, ReactElement } from 'react';

import { render } from '@testing-library/react';

const renderWithPortal = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  elementId = 'portal-container',
) => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute('id', elementId);

  return render(ui, {
    container: document.body.appendChild(portalContainer),
  });
};

export default renderWithPortal;
