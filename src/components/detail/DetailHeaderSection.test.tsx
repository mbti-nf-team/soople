import { render, screen } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';
import { tomorrow, yesterday } from '@/utils/utils';

import GROUP_FIXTURE from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import DetailHeaderSection from './DetailHeaderSection';

describe('DetailHeaderSection', () => {
  const renderDetailHeaderSection = (group = GROUP_FIXTURE) => render((
    <InjectResponsiveContext width={given.width}>
      <DetailHeaderSection
        group={group}
      />
    </InjectResponsiveContext>
  ));

  context('모바일인 경우', () => {
    given('width', () => 400);

    it('프로필 이미지 사이즈는 36px이어야만 한다', () => {
      renderDetailHeaderSection({
        ...GROUP_FIXTURE,
        writer: {
          ...FIXTURE_PROFILE,
          image: '',
        },
      });

      expect(screen.getByTestId('default-profile-icon')).toHaveAttribute('width', '36');
    });
  });

  describe('모집 완료 상태에 따라 다르게 보인다', () => {
    context('모집 완료인 경우', () => {
      it('"~ 명 모집" 문구가 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection({
          ...GROUP_FIXTURE,
          numberApplicants: 1,
          isCompleted: true,
        });

        expect(container).toHaveTextContent('1명 모집');
      });
    });

    context('모집 완료가 아닌 경우', () => {
      it('"~ 명 신청 중" 문구가 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection();

        expect(container).toHaveTextContent('0명 신청 중');
      });
    });
  });

  describe('현재 시간에 따라서 마감 시간 섹션이 다르게 보인다', () => {
    context('모집 마감 일자를 정하지 않은 경우', () => {
      it('글을 작성한 날짜가 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection({
          ...GROUP_FIXTURE,
          createdAt: '2021-11-11',
        });

        expect(container).toHaveTextContent('2021년 11월 11일');
      });
    });

    context('모집 마감 일자가 현재 시간 이후인 경우', () => {
      given('currentTime', () => Date.now());

      it('"~ 후 마감"이 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection({
          ...GROUP_FIXTURE,
          recruitmentEndDate: tomorrow(new Date()),
        });

        expect(container).toHaveTextContent(/하루 후 마감/);
      });
    });

    context('모집 마감 일자가 현재 시간 이전인 경우', () => {
      given('currentTime', () => Date.now());

      it('글 작성 일자가 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection({
          ...GROUP_FIXTURE,
          recruitmentEndDate: yesterday(new Date()),
        });

        expect(container).toHaveTextContent('2021년 10월 11일');
      });
    });
  });
});
