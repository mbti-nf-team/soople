import { fireEvent, render, screen } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';
import { defaultToast } from '@/utils/toast';

import CompleteApplyFormModal from './CompleteApplyFormModal';

jest.mock('@/utils/toast');

describe('CompleteApplyFormModal', () => {
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderCompleteApplyFormModal = () => render((
    <InjectResponsiveContext width={given.width}>
      <CompleteApplyFormModal
        isVisible
        onSubmit={handleSubmit}
        onClose={handleClose}
        numberApplicant={3}
        timeRemaining={given.timeRemaining}
      />
    </InjectResponsiveContext>
  ));

  describe('"완료하기" 버튼을 클릭한다', () => {
    it('submit 이벤트가 발생해야만 한다', () => {
      renderCompleteApplyFormModal();

      fireEvent.change(screen.getByPlaceholderText('메시지를 입력하세요'), {
        target: { value: 'test' },
      });

      fireEvent.submit(screen.getByText('완료하기'));

      expect(handleSubmit).toBeCalledWith({
        numberConfirmApplicants: 3,
        message: 'test',
      });
    });
  });

  context('남은 시간이 존재하는 경우', () => {
    const timeRemaining = '11분';

    given('timeRemaining', () => timeRemaining);

    context('모바일이 아닌 경우', () => {
      given('width', () => 700);

      it(`"아직 모집 마감시간이 ${timeRemaining} 남아있어요." 메시지가 나타나야만 한다`, () => {
        const { container } = renderCompleteApplyFormModal();

        expect(container).toHaveTextContent(`아직 모집 마감시간이 ${timeRemaining} 남아있어요.`);
      });
    });

    context('모바일인 경우', () => {
      given('width', () => 400);

      it(`"아직 모집 마감시간이 ${timeRemaining} 남아있어요."와 함께 토스트 메시지가 호출되어야만 한다`, () => {
        renderCompleteApplyFormModal();

        expect(defaultToast).toBeCalledWith(`아직 모집 마감시간이 ${timeRemaining} 남아있어요.`, {
          position: 'bottom-center',
          style: {
            margin: '0 20px 8px 20px',
          },
        });
      });
    });
  });

  context('남은 시간이 존재하지 않는 경우', () => {
    given('timeRemaining', () => null);

    it('"아직 모집 마감시간이 ~" 문구가 안보여야만 한다', () => {
      const { container } = renderCompleteApplyFormModal();

      expect(container).not.toHaveTextContent('아직 모집 마감시간이');
    });
  });
});
