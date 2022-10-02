import { PropsWithChildren, ReactElement, Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  suspense?: boolean;
}

function ReactQueryWrapper({ suspense = false, children }: PropsWithChildren<Props>): ReactElement {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

  if (suspense) {
    return (
      <QueryClientProvider client={queryClient}>
        <Suspense>
          {children}
        </Suspense>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryWrapper;
