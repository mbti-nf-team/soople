import { render } from '@testing-library/react';

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
    />
  ));

  it('모달에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderCompleteApplyFormModal();

    expect(container).toHaveTextContent('모집을 완료하고 선택한 3명과 함께 팀을 만드시겠습니까?');
  });
});
