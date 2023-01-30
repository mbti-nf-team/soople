import { PropsWithChildren, useCallback } from 'react';

import { ErrorBoundary as SentryErrorBoundary } from '@sentry/nextjs';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import FallbackError from './FallbackError';

type Props = {
  isRootError?: boolean;
  size?: 'small' | 'medium';
};

function ErrorBoundary({
  isRootError, size = 'medium', children,
}: PropsWithChildren<Props>) {
  const memoizedFallbackComponent = useCallback(({ resetError }: SentryFallbackRenderProps) => (
    <FallbackError
      resetError={resetError}
      isRootError={isRootError}
      size={size}
    />
  ), [isRootError, size]);

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
