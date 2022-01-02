import { ParsedUrlQuery } from 'querystring';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import { getGroupDetail } from '@/services/api/group';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailPage, { getServerSideProps } from './[id].page';

jest.mock('@/services/api/group');
jest.mock('@/services/api/auth');

describe('DetailPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: '',
      },
      groupReducer: {
        group: GROUP_FIXTURE,
        writer: PROFILE_FIXTURE,
        comments: [COMMENT_FIXTURE],
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  });

  const renderDetailPage = () => render((
    <DetailPage />
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

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
    });

    it('그룹 정보가 반환되어야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(getGroupDetail).toBeCalledWith('id');
      expect(response.props.initialState.groupReducer.group).toEqual(GROUP_FIXTURE);
    });
  });
});
