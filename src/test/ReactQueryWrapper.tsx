import { ReactChild, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Props {
  children: ReactChild;
}

function ReactQueryWrapper({ children }: Props): ReactElement {
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
