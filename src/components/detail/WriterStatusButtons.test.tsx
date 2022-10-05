import { useRouter } from 'next/router';

import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useRemoveGroup from '@/hooks/api/group/useRemoveGroup';
import useDeleteStorageFile from '@/hooks/api/storage/useDeleteStorageFile';
import InjectMockProviders from '@/test/InjectMockProviders';

import FIXTURE_APPLICANT from '../../../fixtures/applicant';
import FIXTURE_GROUP from '../../../fixtures/group';

import WriterStatusButtons from './WriterStatusButtons';

jest.mock('@/hooks/api/group/useRemoveGroup');
jest.mock('@/hooks/api/storage/useDeleteStorageFile');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('WriterStatusButtons', () => {
  const groupId = 'groupId';
  const removeGroupMutate = jest.fn();
  const removeGroupThumbnailMutate = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: '/',
      },
      push: mockPush,
    }));

    (useRemoveGroup as jest.Mock).mockImplementation(() => ({
      mutate: removeGroupMutate,
    }));

    (useDeleteStorageFile as jest.Mock).mockImplementation(() => ({
      mutate: removeGroupThumbnailMutate,
    }));

    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_APPLICANT],
    }));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderWriterStatusButtons = (isCompleted = false) => render((
    <InjectMockProviders width={given.width}>
      <WriterStatusButtons
        group={given.group}
        isCompleted={isCompleted}
      />
    </InjectMockProviders>
  ));

  context('모바일인 경우', () => {
    given('width', () => 400);
    given('group', () => (FIXTURE_GROUP));

    it('수정, 삭제 아이콘 버튼이 나타나야만 한다', () => {
      renderWriterStatusButtons();

      expect(screen.getByTestId('writer-action-wrapper')).toBeInTheDocument();
    });
  });

  context('모바일이 아닌 경우', () => {
    describe('수정 버튼을 클릭한다', () => {
      given('group', () => (FIXTURE_GROUP));

      it('router.push가 호출되어야만 한다', () => {
        renderWriterStatusButtons();

        fireEvent.click(screen.getByText('수정'));

        expect(mockPush).toBeCalledWith(`/write?id=${FIXTURE_GROUP.groupId}`);
      });
    });

    describe('삭제 버튼을 클릭한다', () => {
      given('group', () => (FIXTURE_GROUP));

      it('삭제하기 모달창이 나타나야만 한다', () => {
        const { container } = renderWriterStatusButtons();

        fireEvent.click(screen.getByText('삭제'));

        expect(container).toHaveTextContent('이 글을 정말 삭제하시겠습니까? 삭제하시면 다시 되돌릴 수 없습니다.');
      });

      describe('삭제하기 모달창에서 "닫기" 버튼을 클릭한다', () => {
        it('삭제하기 모달창이 안보여야만 한다', () => {
          const { container } = renderWriterStatusButtons();

          fireEvent.click(screen.getByText('삭제'));
          fireEvent.click(screen.getByText('닫기'));

          act(() => {
            jest.advanceTimersByTime(400);
          });

          expect(container).not.toHaveTextContent('이 글을 정말 삭제하시겠습니까? 삭제하시면 다시 되돌릴 수 없습니다.');
        });
      });

      describe('삭제하기 모달창에서 "삭제하기" 버튼을 클릭한다', () => {
        context('썸네일이 존재하는 경우', () => {
          const thumbnail = 'www.test.com';

          given('group', () => ({
            ...FIXTURE_GROUP,
            thumbnail,
          }));

          it('group mutate와 thumbnail mutate가 호출되어야만 한다', () => {
            renderWriterStatusButtons();

            fireEvent.click(screen.getByText('삭제'));
            fireEvent.click(screen.getByTestId('confirm-button'));

            expect(removeGroupMutate).toBeCalledWith({
              ...FIXTURE_GROUP,
              thumbnail,
            });
            expect(removeGroupThumbnailMutate).toBeCalledWith(thumbnail);
          });
        });

        context('썸네일이 존재하지 않는 경우', () => {
          given('group', () => (FIXTURE_GROUP));

          it('thumbnail mutate가 호출되지 않아야만 한다', () => {
            renderWriterStatusButtons();

            fireEvent.click(screen.getByText('삭제'));
            fireEvent.click(screen.getByTestId('confirm-button'));

            expect(removeGroupMutate).toBeCalledWith(FIXTURE_GROUP);
            expect(removeGroupThumbnailMutate).not.toBeCalled();
          });
        });
      });
    });
  });

  describe('isCompleted 상태에 따라 다르게 보인다', () => {
    given('group', () => ({
      ...FIXTURE_GROUP,
      groupId,
    }));

    context('isCompleted가 true인 경우', () => {
      it('"팀원 보기"버튼이 보여야만 한다', () => {
        const { container } = renderWriterStatusButtons(true);

        expect(container).toHaveTextContent('팀원 보기');
      });

      describe('"팀원 보기" 버튼을 클릭한다', () => {
        it('팀원 리스트 모달창이 나타나야만 한다', () => {
          renderWriterStatusButtons(true);

          fireEvent.click(screen.getByText('팀원 보기'));

          expect(screen.getByTestId('modal-box')).toBeInTheDocument();
        });
      });

      describe('모달창이 열린 상태에서 "X" 아이콘을 클릭한다', () => {
        beforeEach(() => {
          jest.useFakeTimers();
        });

        afterEach(() => {
          jest.clearAllTimers();
        });

        it('모달창이 사라저야만 한다', async () => {
          const { container } = renderWriterStatusButtons(true);

          fireEvent.click(screen.getByText('팀원 보기'));
          fireEvent.click(screen.getByTestId('close-icon'));

          await act(async () => {
            jest.advanceTimersByTime(400);
          });

          expect(container).not.toHaveTextContent('팀원 0명');
        });
      });
    });

    context('isCompleted가 false인 경우', () => {
      it('"신청현황 보기"버튼이 보여야만 한다', () => {
        const { container } = renderWriterStatusButtons(false);

        expect(container).toHaveTextContent('신청현황 보기');
        expect(screen.getByText('신청현황 보기')).toHaveAttribute('href', `/detail/${groupId}/applicants`);
      });
    });
  });
});
