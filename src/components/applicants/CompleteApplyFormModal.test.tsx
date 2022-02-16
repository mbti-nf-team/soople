import { fireEvent, render, screen } from '@testing-library/react';

import CompleteApplyFormModal from './CompleteApplyFormModal';

describe('CompleteApplyFormModal', () => {
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();

  const renderCompleteApplyFormModal = () => render((
    <CompleteApplyFormModal
      isVisible
      onSubmit={handleSubmit}
      onClose={handleClose}
      numberApplicant={3}
      timeRemaining={given.timeRemaining}
    />
  ));

  describe('"완료하기" 버튼을 클릭한다', () => {
    it('submit 이벤트가 발생해야만 한다', () => {
      renderCompleteApplyFormModal();

      fireEvent.change(screen.getByPlaceholderText('팀 멤버들에게 보낼 메시지를 입력하세요'), {
        target: { value: 'test' },
      });

      fireEvent.submit(screen.getByText('완료하기'));

      expect(handleSubmit).toBeCalledWith({
        numberConfirmApplicants: 3,
        message: 'test',
      });
    });
  });

  context('남은 시간이 존재할 경우', () => {
    const timeRemaining = '11분';

    given('timeRemaining', () => timeRemaining);

    it(`"아직 모집 마감시간이 ${timeRemaining} 남아있어요." 메시지가 나타나야만 한다`, () => {
      const { container } = renderCompleteApplyFormModal();

      expect(container).toHaveTextContent(`아직 모집 마감시간이 ${timeRemaining} 남아있어요.`);
    });
  });

  context('남은 시간이 존재하지 않는 경우', () => {
    given('timeRemaining', () => null);

    it('"아직 모집 마감시간이" 메시지가 보이지 않아야만 한다', () => {
      const { container } = renderCompleteApplyFormModal();

      expect(container).not.toHaveTextContent('아직 모집 마감시간이');
    });
  });
});
