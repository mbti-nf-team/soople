import { ParsedUrlQuery } from 'querystring';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import { getGroupDetail } from '@/services/api/group';
import firebaseAdmin from '@/services/firebase/firebaseAdmin';

import ApplicantsPage, { getServerSideProps } from './applicants.page';

jest.mock('@/services/api/group');

describe('applicants', () => {
  const renderApplicants = () => render((
    <ApplicantsPage />
  ));

  it('신청현황 페이지가 나타나야만 한다', () => {
    const { container } = renderApplicants();

    expect(container).toHaveTextContent('신청현황');
  });
});

describe('getServerSideProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.console, 'log').mockImplementation(() => null);
  });

  const mockContext = {
    params: { id: 'id' } as ParsedUrlQuery,
  };

  context('해당 id를 가진 detail 페이지 정보가 없을 경우', () => {
    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockReturnValueOnce('');
    });

    it('notFound가 "true"를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(getGroupDetail).toBeCalledWith('id');
      expect(response.notFound).toBeTruthy();
    });
  });

  context('로그인한 사용자가 글 작성자가 아닐 경우', () => {
    const token = {
      uid: '1',
    };

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockResolvedValue({
        writer: {
          uid: '123',
        },
      });
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      }));
    });

    it('redirect를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(getGroupDetail).toBeCalledWith('id');
      expect(response.redirect).toEqual({
        permanent: false,
        destination: '/?error=unauthenticated',
      });
    });
  });

  context('로그인한 사용자가 글 작성자인 경우', () => {
    const token = {
      uid: '123',
    };
    const groupId = '1';

    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockResolvedValue({
        writer: {
          uid: '123',
        },
        groupId,
      });
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      }));
    });

    it('groupId가 반환되어야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(getGroupDetail).toBeCalledWith('id');
      expect(response.props.initialState.groupReducer.groupId).toBe(groupId);
    });
  });

  context('에러가 발생한 경우', () => {
    beforeEach(() => {
      (getGroupDetail as jest.Mock).mockResolvedValue({
        writer: {
          uid: '123',
        },
      });
      (firebaseAdmin.auth as jest.Mock).mockImplementation(() => ({
        verifyIdToken: jest.fn().mockRejectedValue(new Error('error')),
      }));
    });

    it('redirect를 반환해야만 한다', async () => {
      const response: any = await getServerSideProps(mockContext as GetServerSidePropsContext);

      expect(response.redirect).toEqual({
        permanent: false,
        destination: '/?error=unauthenticated',
      });
    });
  });
});
