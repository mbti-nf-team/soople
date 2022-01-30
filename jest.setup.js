/* eslint-disable no-console */
import { setLogger } from 'react-query';

import '@testing-library/jest-dom/extend-expect';
import 'jest-plugin-context/setup';
import 'given2/setup';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
