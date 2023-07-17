import { ReactElement, Suspense } from 'react';

import dynamic from 'next/dynamic';

import styled from '@emotion/styled';
import { ClientOnly } from '@nft-team/react';

import ApplicationStatusSkeletonLoader from '@/components/applicants/ApplicationStatusSkeletonLoader';
import ErrorBoundary from '@/components/common/errorBoundary/ErrorBoundary';
import useResponsive from '@/hooks/useResponsive';
import GradientBlock from '@/styles/GradientBlock';
import { DetailLayout } from '@/styles/Layout';
import { mq2 } from '@/styles/responsive';

const ApplicationStatus = dynamic(() => import('@/components/applicants/ApplicationStatus'), { suspense: true });

function ApplicationStatusContainer(): ReactElement {
  const { isMobile } = useResponsive();

  return (
    <ClientOnly>
      <ApplicationStatusDetailLayout>
        <ErrorBoundary>
          <Suspense fallback={<ApplicationStatusSkeletonLoader isMobile={isMobile} />}>
            <ApplicationStatus />
          </Suspense>
        </ErrorBoundary>
        {isMobile && (
          <GradientBlock data-testid="gradient-block" />
        )}
      </ApplicationStatusDetailLayout>
    </ClientOnly>
  );
}

export default ApplicationStatusContainer;

const ApplicationStatusDetailLayout = styled(DetailLayout)`
  ${mq2({
    height: ['calc(100vh - 124px)', 'auto'],
  })};

  max-width: 686px;
  width: calc(100% - 2.5rem);
  overflow-y: auto;
`;
