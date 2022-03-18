import { fireEvent, render, screen } from '@testing-library/react';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';

import FIXTURE_APPLICANT from '../../../../fixtures/applicant';

import MembersViewModal from './MembersViewModal';

jest.mock('@/hooks/api/applicant/useFetchApplicants');

describe('MembersViewModal', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [{
        ...FIXTURE_APPLICANT,
        isConfirm: true,
      }],
    }));
  });

  const renderMembersViewModal = () => render((
    <MembersViewModal
      isVisible
      onClose={handleClose}
    />
  ));

  describe('닫기 버튼을 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderMembersViewModal();

      fireEvent.click(screen.getByTestId('close-icon'));

      expect(handleClose).toBeCalled();
    });
  });

  it('팀원에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderMembersViewModal();

    expect(container).toHaveTextContent('팀원 1명');
  });
});
