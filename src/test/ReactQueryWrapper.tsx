import { PropsWithChildren, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

function ReactQueryWrapper({ children }: PropsWithChildren<unknown>): ReactElement {
  const queryClient = new QueryClient({
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
