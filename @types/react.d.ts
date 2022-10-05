// eslint-disable-next-line import/no-self-import, react/no-typos
import 'react';

declare module 'react' {
  function memo<A, B>(Component: (props: A) => B): (props: A) => ReactElement | null;
}
