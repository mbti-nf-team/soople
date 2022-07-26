import {
  PropsWithChildren, ReactElement, useMemo,
} from 'react';
import { Context as ResponsiveContext } from 'react-responsive';

interface Props {
  width: number;
}

function InjectResponsiveContext({
  width, children,
}: PropsWithChildren<Props>): ReactElement {
  const value = useMemo(() => ({ width }), [width]);

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export default InjectResponsiveContext;
