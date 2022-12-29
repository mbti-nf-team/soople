import { createRef } from 'react';

import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useInfiniteFetchUserRecruitedGroups from '@/hooks/api/group/useInfiniteFetchUserRecruitedGroups';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';

import FIXTURE_GROUP from '../../../fixtures/group';

import RecruitedPage, { getServerSideProps } from './recruited.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));
jest.mock('@/hooks/api/group/useInfiniteFetchUserRecruitedGroups');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/services/serverSideProps/authenticatedServerSideProps');

describe('RecruitedPage', () => {
  beforeEach(() => {
    (useInfiniteFetchUserRecruitedGroups as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [FIXTURE_GROUP],
          }],
        },
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: {
        uid: '1',
      },
    }));
  });

  const renderRecruitedPage = () => render((
    <RecruitedPage />
  ));

  it('모집한 팀 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderRecruitedPage();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });
});

describe('getServerSideProps', () => {
  it('authenticatedServerSideProps 함수를 반환해야만 한다', () => {
    const result = getServerSideProps;

    expect(result).toBe(authenticatedServerSideProps);
  });
});
