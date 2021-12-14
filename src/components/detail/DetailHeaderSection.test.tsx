import { render, screen } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailHeaderSection from './DetailHeaderSection';

describe('DetailHeaderSection', () => {
  const renderDetailHeaderSection = () => render((
    <DetailHeaderSection
      writer={given.writer}
      group={GROUP_FIXTURE}
    />
  ));

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
