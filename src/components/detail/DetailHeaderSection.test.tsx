import { render } from '@testing-library/react';

import { tomorrow, yesterday } from '@/utils/utils';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailHeaderSection from './DetailHeaderSection';

describe('DetailHeaderSection', () => {
  const renderDetailHeaderSection = (group = GROUP_FIXTURE) => render((
    <DetailHeaderSection
      currentTime={given.currentTime}
      group={group}
    />
  ));

  describe('현재 시간에 따라서 마감 시간 섹션이 다르게 보인다', () => {
    given('writer', () => (PROFILE_FIXTURE));

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

      it('"모집 마감"이 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection({
          ...GROUP_FIXTURE,
          recruitmentEndDate: yesterday(new Date()),
        });

        expect(container).toHaveTextContent(/모집 마감/);
      });
    });
  });
});
