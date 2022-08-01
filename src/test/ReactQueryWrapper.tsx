import { PropsWithChildren, ReactElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function ReactQueryWrapper({ children }: PropsWithChildren<unknown>): ReactElement {
  const queryClient = new QueryClient({
    logger: {
      // eslint-disable-next-line no-console
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryWrapper;
