import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import NewWriteFormContainer from './NewWriteFormContainer';

describe('NewWriteFormContainer', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockImplementation(() => ([given.session, given.loading]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderNewWriteFormContainer = () => render((
    <NewWriteFormContainer />
  ));

  context('세션이 존재하는 경우', () => {
    given('session', () => 'session');

    const placeholderTexts = [
      '제목을 입력하세요',
      '내용을 입력하세요',
    ];

    it('팀 모집하기 작성 폼에 대한 인풋 창이 나타나야만 한다', () => {
      renderNewWriteFormContainer();

      placeholderTexts.forEach((placeholderText) => {
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
      });
    });
  });

  context('세션이 존재하지 않는 경우', () => {
    given('session', () => null);

    it('"로그인 후 이용해주세요!" 문구가 나타나야만 한다', () => {
      const { container } = renderNewWriteFormContainer();

      expect(container).toHaveTextContent('로그인 후 이용해주세요!');
    });
  });

  context('로딩중인 경우', () => {
    given('loading', () => true);

    it('"로딩중..." 문구가 나타나야마 한다', () => {
      const { container } = renderNewWriteFormContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });
});
