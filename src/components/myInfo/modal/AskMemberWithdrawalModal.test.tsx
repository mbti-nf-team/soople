import { fireEvent, screen } from '@testing-library/react';

import renderWithPortal from '@/test/renderWithPortal';

import AskMemberWithdrawalModal from './AskMemberWithdrawalModal';

describe('AskMemberWithdrawalModal', () => {
  const handleWithdrawal = jest.fn();
  const handleClose = jest.fn();

  const renderAskMemberWithdrawalModal = () => renderWithPortal((
    <AskMemberWithdrawalModal
      isVisible={given.isVisible}
      onClose={handleClose}
      onWithdrawal={handleWithdrawal}
    />
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskMemberWithdrawalModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('탈퇴하기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskMemberWithdrawalModal();

        screen.getAllByText('탈퇴하기').forEach((button) => {
          fireEvent.click(button);
        });

        expect(handleWithdrawal).toHaveBeenCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderAskMemberWithdrawalModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
