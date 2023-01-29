import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mq, { mobileMediaQuery } from '@/styles/responsive';

import SkeletonItem from '../common/SkeletonItem';

interface Props {
  isMobile: boolean;
}

function ApplicationStatusSkeletonLoader({ isMobile }: Props) {
  return (
    <SkeletonWrapper title="loading...">
      {Array.from({ length: isMobile ? 5 : 8 }, (_, i) => (i)).map((key) => (
        <SkeletonItemWrapper key={key}>
          <div>
            <ProfileImageSkeleton circle />
            <div className="user-information-skeleton">
              <SkeletonItem
                serializedStyles={css`
                    ${mobileMediaQuery} {
                      width: 100px;
                    }

                    height: 20px;
                    width: 80px;
                  `}
                styles={{
                  margin: '0 0 8px 0',
                }}
              />
              <SkeletonItem
                serializedStyles={css`
                    ${mobileMediaQuery} {
                      width: 80px;
                    }

                    height: 16px;
                    width: 160px;
                  `}
              />
              {isMobile && (
                <SkeletonItem
                  serializedStyles={css`
                    height: 16px;
                    width: 160px;
                    margin-top: 8px;
                  `}
                />
              )}
            </div>
          </div>
          <div>
            <SkeletonItem
              serializedStyles={css`
                  ${mobileMediaQuery} {
                    width: 160px;
                  }

                  height: 18px;
                  width: 400px;
                `}
              styles={{
                margin: '0 0 8px 0',
              }}
            />
            <SkeletonItem
              styles={{
                height: '18px',
                width: '240px',
              }}
            />
          </div>
        </SkeletonItemWrapper>
      ))}
    </SkeletonWrapper>
  );
}

export default ApplicationStatusSkeletonLoader;

const SkeletonWrapper = styled.div`
  ${mobileMediaQuery} {
    margin-top: 0px;
  }

  margin-bottom: 40px;
  margin-top: 24px;

  & > :not(:last-of-type) {
    border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
  }
`;

const SkeletonItemWrapper = styled.div`
  ${mq({
    marginTop: ['24px', '16px'],
  })}

  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  .user-information-skeleton {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
  }
`;

const ProfileImageSkeleton = styled(SkeletonItem)`
  ${mq({
    height: ['36px', '48px'],
    width: ['36px', '48px'],
    minWidth: ['36px', '48px'],
    minHeight: ['36px', '48px'],
  })};
`;
