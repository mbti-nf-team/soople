import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import RegisterModalContainer from './RegisterModalContainer';

describe('RegisterModalContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);
    (useSelector as jest.Mock).mockImplementationOnce((selector) => selector({
      groupReducer: {
        isVisible: given.isVisible,
      },
    }));
  });

  const renderRegisterModalContainer = () => render((
    <RegisterModalContainer />
  ));

  context('모달창이 보이는 경우', () => {
    given('isVisible', () => true);

    it('등록 모달에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderRegisterModalContainer();

      expect(container).toHaveTextContent('제목 없음 등록');
    });

    describe('닫기 버튼을 클릭한다', () => {
      it('dispatch "setRegisterModalVisible" 액션이 호출되어야만 한다', () => {
        renderRegisterModalContainer();

        fireEvent.click(screen.getByText('닫기'));

        expect(dispatch).toBeCalledWith({
          type: 'group/setRegisterModalVisible',
          payload: false,
        });
      });
    });

    describe('"등록하기" 버튼을 클릭한다', () => {
      it('dispatch 액션이 호출되어야만 한다', () => {
        renderRegisterModalContainer();

        fireEvent.click(screen.getByText('등록하기'));

        expect(dispatch).toBeCalled();
      });
    });
  });

  context('모달창이 보이지 않는 경우', () => {
    given('isVisible', () => false);

    it('아무것도 렌더링 되지 말아야 한다', () => {
      const { container } = renderRegisterModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
