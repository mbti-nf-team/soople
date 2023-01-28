import { PropsWithChildren, useCallback } from 'react';

import { useRouter } from 'next/router';

import { ErrorBoundary as SentryErrorBoundary } from '@sentry/nextjs';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

type Props = {
  errorMessage: string;
  isRootError?: boolean;
};

function ErrorBoundary({ isRootError, errorMessage, children }: PropsWithChildren<Props>) {
  const { replace } = useRouter();

  const memoizedFallbackComponent = useCallback(({ resetError }: SentryFallbackRenderProps) => {
    if (isRootError) {
      replace('/500');
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div>{errorMessage}</div>
        <button type="button" onClick={resetError}>
          재시도
        </button>
      </div>
    );
  }, [replace, isRootError, errorMessage]);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <SentryErrorBoundary
          onReset={reset}
          fallback={memoizedFallbackComponent}
        >
          {children}
        </SentryErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default ErrorBoundary;
