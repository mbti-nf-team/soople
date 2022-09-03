import { fireEvent, render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import WriteFormContainer from './WriteFormContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@remirror/react');

describe('WriteFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
  });

  const renderWriteFormContainer = () => render((
    <InjectTestingRecoilState>
      <WriteFormContainer />
    </InjectTestingRecoilState>
  ));

  context('로그인한 사용자인 경우', () => {
    given('user', () => 'user');

    const placeholderTexts = [
      '제목을 입력하세요',
    ];

    it('팀 모집하기 작성 폼에 대한 인풋 창이 나타나야만 한다', () => {
      renderWriteFormContainer();

      placeholderTexts.forEach((placeholderText) => {
        expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
      });
    });

    describe('인풋창에 글을 작성한다', () => {
      const inputValue = {
        name: 'title',
        value: 'test',
      };

      it('change 이벤트가 호출되어 값이 변해야한다', () => {
        renderWriteFormContainer();

        fireEvent.change(screen.getByPlaceholderText('제목을 입력하세요'), { target: inputValue });

        expect(screen.getByPlaceholderText('제목을 입력하세요')).toHaveValue('test');
      });
    });

    describe('태그를 입력한다', () => {
      it('change 이벤트가 호출되어 값이 변해야한다', () => {
        const { container } = renderWriteFormContainer();

        const input = screen.getByPlaceholderText('태그를 입력하세요');

        fireEvent.change(input, { target: { value: 'test' } });

        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

        expect(container).toHaveTextContent('test');
      });
    });
  });

  context('로그인하지 않은 사용자인 경우', () => {
    given('user', () => null);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderWriteFormContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
