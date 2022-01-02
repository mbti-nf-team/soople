import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import WriteFormContainer from './WriteFormContainer';

describe('WriteFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
      groupReducer: {
        writeFields: {
          title: '',
          contents: '',
          tags: [],
        },
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWriteFormContainer = () => render((
    <WriteFormContainer />
  ));

  context('로그인한 사용자인 경우', () => {
    given('user', () => 'user');

    const placeholderTexts = [
      '제목을 입력하세요',
      '내용을 입력하세요',
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

      it('"changeWriteFields" dispatch 액션이 호출되어야만 한다', () => {
        renderWriteFormContainer();

        fireEvent.change(screen.getByPlaceholderText('제목을 입력하세요'), { target: inputValue });

        expect(dispatch).toBeCalledWith({
          payload: inputValue,
          type: 'group/changeWriteFields',
        });
      });
    });

    describe('태그를 입력한다', () => {
      it('dispatch "changeWriteFields" 이벤트가 발생해야만 한다', () => {
        renderWriteFormContainer();

        const input = screen.getByPlaceholderText('태그를 입력하세요');

        fireEvent.change(input, { target: { value: 'test' } });

        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

        expect(dispatch).toBeCalledWith({
          payload: {
            name: 'tags',
            value: ['test'],
          },
          type: 'group/changeWriteFields',
        });
      });
    });
  });

  context('로그인하지 않은 사용자인 경우', () => {
    given('user', () => null);

    it('"로그인 후 이용해주세요!" 문구가 나타나야만 한다', () => {
      const { container } = renderWriteFormContainer();

      expect(container).toHaveTextContent('로그인 후 이용해주세요!');
    });
  });
});
