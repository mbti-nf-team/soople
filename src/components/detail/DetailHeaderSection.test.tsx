import { render, screen } from '@testing-library/react';

import { tomorrow, yesterday } from '@/utils/utils';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailHeaderSection from './DetailHeaderSection';

describe('DetailHeaderSection', () => {
  const renderDetailHeaderSection = (group = GROUP_FIXTURE) => render((
    <DetailHeaderSection
      currentTime={given.currentTime}
      writer={given.writer}
      group={group}
    />
  ));

  describe('현재 시간에 따라서 마감 시간 섹션이 다르게 보인다', () => {
    given('writer', () => (PROFILE_FIXTURE));

    context('모집 마감 일자를 정하지 않은 경우', () => {
      it('글을 작성한 날짜가 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection({
          ...GROUP_FIXTURE,
          createAt: '2021-11-11',
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

  describe('작성자의 프로필 이미지 섹션을 볼 수 있다', () => {
    context('작성자의 프로필 이미지가 존재하지 않는 경우', () => {
      given('writer', () => ({
        ...PROFILE_FIXTURE,
        image: '',
      }));

      it('"이미지 없음"이 나타나야 한다', () => {
        const { container } = renderDetailHeaderSection();

        expect(container).toHaveTextContent('이미지 없음');
      });
    });

    context('작성자의 프로필 이미지가 존재하는 경우', () => {
      given('writer', () => (PROFILE_FIXTURE));

      it('작성자의 이미지가 나타나야 한다', () => {
        renderDetailHeaderSection();

        expect(screen.getByAltText('writer-img')).not.toBeNull();
      });
    });
  });

  describe('작성자의 아이디를 볼 수 있다', () => {
    context('작성자의 이름이 존재하는 경우', () => {
      given('writer', () => (PROFILE_FIXTURE));

      it('작성자의 이름이 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection();

        expect(container).toHaveTextContent(PROFILE_FIXTURE.name as string);
      });
    });

    context('작성자의 이름이 존재하지 않는 경우', () => {
      given('writer', () => ({
        ...PROFILE_FIXTURE,
        name: '',
      }));

      it('작성자의 이메일이 나타나야만 한다', () => {
        const { container } = renderDetailHeaderSection();

        expect(container).toHaveTextContent(PROFILE_FIXTURE.email);
      });
    });
  });
});
