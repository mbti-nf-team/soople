import { ParsedUrlQuery } from 'querystring';

import { QueryClient } from 'react-query';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import useApplyGroup from '@/hooks/api/applicant/useApplyGroup';
import useCancelApply from '@/hooks/api/applicant/useCancelApply';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchComments from '@/hooks/api/comment/useFetchComments';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import { getGroupDetail } from '@/services/api/group';
import InjectMockProviders from '@/test/InjectMockProviders';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import COMMENT_FIXTURE from '../../../fixtures/comment';
import GROUP_FIXTURE from '../../../fixtures/group';

import DetailPage, { getServerSideProps } from './[id].page';

jest.mock('@/services/api/group');
jest.mock('@/hooks/api/applicant/useApplyGroup');
jest.mock('@/hooks/api/applicant/useCancelApply');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/comment/useAddComment');
jest.mock('@/hooks/api/comment/useDeleteComment');
jest.mock('@/hooks/api/comment/useFetchComments');
jest.mock('@/hooks/api/group/useFetchGroup');

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

    (useFetchComments as jest.Mock).mockImplementation(() => ({
      data: [COMMENT_FIXTURE],
      isLoading: false,
    }));
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: GROUP_FIXTURE,
    }));
    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [APPLICANT_FIXTURE],
      isLoading: false,
    }));
    (useApplyGroup as jest.Mock).mockImplementation(() => ({ mutate }));
    (useCancelApply as jest.Mock).mockImplementation(() => ({ mutate }));
    (useAddComment as jest.Mock).mockImplementation(() => ({ mutate }));
    (useDeleteComment as jest.Mock).mockImplementation(() => ({ mutate }));
  });

  const renderDetailPage = () => render((
    <InjectMockProviders>
      <DetailPage />
    </InjectMockProviders>
  ));

  it('detail 페이지에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderDetailPage();

    expect(container).toHaveTextContent('title');
    expect(container).toHaveTextContent('content');
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
