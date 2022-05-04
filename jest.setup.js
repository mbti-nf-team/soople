/* eslint-disable no-console */
import { setLogger } from 'react-query';

import '@testing-library/jest-dom/extend-expect';
import 'jest-plugin-context/setup';
import 'given2/setup';

jest.mock('@/utils/rehypePrism');
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...props) => {
    const dynamicModule = jest.requireActual('next/dynamic');
    const dynamicActualComp = dynamicModule.default;
    const RequiredComponent = dynamicActualComp(props[0]);

    if (RequiredComponent.preload) {
      RequiredComponent.preload();

      return RequiredComponent;
    }

    RequiredComponent.render.preload();

    return RequiredComponent;
  },
}));

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
