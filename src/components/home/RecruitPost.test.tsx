import { render, screen } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPost from './RecruitPost';

describe('RecruitPost', () => {
  const renderRecruitPost = () => render((
    <RecruitPost
      group={given.group}
    />
  ));

  context('작성자 이미지가 존재할 경우', () => {
    given('group', () => (GROUP_FIXTURE));

    it('프로필 이미지가 나타나야만 한다', () => {
      renderRecruitPost();

      expect(screen.getByAltText('writer-img')).not.toBeNull();
    });
  });

  context('작성자 이미지가 존재하지 않는 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      writer: {
        ...GROUP_FIXTURE.writer,
        image: '',
      },
    }));

    it('프로필 이미지가 나타나야만 한다', () => {
      const { container } = renderRecruitPost();

      expect(container).toHaveTextContent('이미지 없음');
    });
  });

  context('작성자 닉네임이 존재하지 않는 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      writer: {
        ...GROUP_FIXTURE.writer,
        name: '',
      },
    }));

    it('작성자 이메일이 나타나야만 한다', () => {
      const { container } = renderRecruitPost();

      expect(container).toHaveTextContent(/test@test.com/);
    });
  });
});
