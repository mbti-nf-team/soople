import { ParsedUrlQuery } from 'querystring';

import { createRef } from 'react';

import { GetServerSidePropsContext } from 'next';

import { QueryClient } from '@tanstack/react-query';
import { act, render } from '@testing-library/react';

import useFetchAlertAlarms from '@/hooks/api/alarm/useFetchAlertAlarms';
import useApplyGroup from '@/hooks/api/applicant/useApplyGroup';
import useCancelApply from '@/hooks/api/applicant/useCancelApply';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useSignOut from '@/hooks/api/auth/useSignOut';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useInfiniteFetchComments from '@/hooks/api/comment/useInfiniteFetchComments';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import useRemoveGroup from '@/hooks/api/group/useRemoveGroup';
import useDeleteStorageFile from '@/hooks/api/storage/useDeleteStorageFile';
import { getGroupDetail } from '@/services/api/group';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import { filteredWithSanitizeHtml } from '@/utils/filter';

import FIXTURE_ALARM from '../../../fixtures/alarm';
import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import COMMENT_FIXTURE from '../../../fixtures/comment';
import GROUP_FIXTURE from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import DetailPage, { getServerSideProps } from './[id].page';

jest.mock('@/services/api/group');
jest.mock('@/hooks/api/applicant/useApplyGroup');
jest.mock('@/hooks/api/applicant/useCancelApply');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/comment/useAddComment');
jest.mock('@/hooks/api/comment/useDeleteComment');
jest.mock('@/hooks/api/comment/useInfiniteFetchComments');
jest.mock('@/hooks/api/group/useFetchGroup');
jest.mock('@/utils/filter');
jest.mock('@/hooks/api/group/useIncreaseView');
jest.mock('@/hooks/api/alarm/useFetchAlertAlarms');
jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useSignOut');
jest.mock('@/hooks/api/group/useRemoveGroup');
jest.mock('@/hooks/api/storage/useDeleteStorageFile');

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: '1',
    },
  })),
}));

describe('DetailPage', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (filteredWithSanitizeHtml as jest.Mock).mockImplementation(() => GROUP_FIXTURE.content);

    (useInfiniteFetchComments as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [COMMENT_FIXTURE],
          }],
        },
        isLoading: false,
        isIdle: false,
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: GROUP_FIXTURE,
    }));
    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [APPLICANT_FIXTURE],
      isLoading: false,
    }));
    (useFetchAlertAlarms as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_ALARM],
    }));
    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));

    (useDeleteStorageFile as jest.Mock).mockImplementation(() => ({ mutate }));
    (useRemoveGroup as jest.Mock).mockImplementation(() => ({ mutate }));
    (useSignOut as jest.Mock).mockImplementation(() => ({ mutate }));
    (useApplyGroup as jest.Mock).mockImplementation(() => ({ mutate }));
    (useCancelApply as jest.Mock).mockImplementation(() => ({ mutate }));
    (useAddComment as jest.Mock).mockImplementation(() => ({ mutate }));
    (useDeleteComment as jest.Mock).mockImplementation(() => ({ mutate }));
  });

  const renderDetailPage = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoilState>
        <DetailPage />
      </InjectTestingRecoilState>
    </ReactQueryWrapper>
  ));

  it('detail 페이지에 대한 내용이 나타나야만 한다', async () => {
    const { container } = renderDetailPage();

    await act(() => expect(container).toHaveTextContent('title'));
  });
});

describe('getServerSideProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.console, 'log').mockImplementation(() => null);
  });

  context('params가 존재하지 않는 경우', () => {
    const mockContext = {
      params: { id: '' } as ParsedUrlQuery,
    };

    it('notFound가 "true"를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(response.notFound).toBeTruthy();
    });
  });

  context('해당 id를 가진 detail 페이지 정보가 없을 경우', () => {
    const mockContext = {
      params: { id: 'id' } as ParsedUrlQuery,
    };

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockReturnValueOnce('');
    });

    it('notFound가 "true"를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(getGroupDetail).toBeCalledWith('id');
      expect(response.notFound).toBeTruthy();
    });
  });

  context('해당 id를 가진 detail 페이지 정보가 존재하는 경우', () => {
    const mockContext = {
      params: { id: 'id' } as ParsedUrlQuery,
    };
    const queryClient = new QueryClient();

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
      jest.spyOn(queryClient, 'getQueryData').mockReturnValue(GROUP_FIXTURE);
    });

    it('그룹 정보가 반환되어야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(getGroupDetail).toBeCalledWith('id');
      expect(response.props.dehydratedState.queries[0].state.data).toEqual(GROUP_FIXTURE);
    });
  });
});
