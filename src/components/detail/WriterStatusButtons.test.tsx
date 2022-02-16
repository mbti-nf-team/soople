import { fireEvent, render, screen } from '@testing-library/react';

import InjectMockProviders from '@/test/InjectMockProviders';

import WriterStatusButtons from './WriterStatusButtons';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: '/',
    },
  })),
}));

describe('WriterStatusButtons', () => {
  const groupId = 'groupId';

  const renderWriterStatusButtons = (isCompleted: boolean) => render((
    <InjectMockProviders>
      <WriterStatusButtons
        groupId={groupId}
        isCompleted={isCompleted}
      />
    </InjectMockProviders>
  ));

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

    describe('모달창이 열린 상태에서 "닫기" 버튼을 클릭한다', () => {
      it('모달창이 사라저야만 한다', () => {
        const { container } = renderWriterStatusButtons(true);

        fireEvent.click(screen.getByText('팀원 보기'));
        fireEvent.click(screen.getByText('닫기'));

        expect(container).not.toHaveTextContent('닫기');
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
