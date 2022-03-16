import { fireEvent, render, screen } from '@testing-library/react';

import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import RecruitCompleteModal from './RecruitCompleteModal';

describe('RecruitCompleteModal', () => {
  const renderRecruitCompleteModal = () => render((
    <InjectTestingRecoilState recruitCompleteModalVisible={given.isVisible}>
      <RecruitCompleteModal />
    </InjectTestingRecoilState>
  ));

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderRecruitCompleteModal();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    it('모집 완료 모달창이 나타나야만 한다', () => {
      const { container } = renderRecruitCompleteModal();

      expect(container).toHaveTextContent('팀원 모집 완료');
    });

    describe('"확인" 버튼을 클릭한다', () => {
      it('모집 완료 모달창이 사라져야만 한다', () => {
        const { container } = renderRecruitCompleteModal();

        fireEvent.click(screen.getByText('확인'));

        expect(container).toBeEmptyDOMElement();
      });
    });

    describe('모달창 바깥 부분을 클릭한다', () => {
      it('모집 완료 모달창이 사라져야만 한다', () => {
        const { container } = renderRecruitCompleteModal();

        fireEvent.mouseDown(document);

        expect(container).toBeEmptyDOMElement();
      });
    });
  });
});
