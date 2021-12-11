import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalContainer from './PublishModalContainer';

describe('PublishModalContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        isVisible: given.isVisible,
        writeFields: given.writeFields,
      },
    }));
    (useSession as jest.Mock).mockImplementation(() => ([{
      user: {
        uid: 'uid',
      },
    }]));
  });

  const renderPublishModalContainer = () => render((
    <PublishModalContainer />
  ));

  context('모달창이 보이는 경우', () => {
    given('writeFields', () => WRITE_FIELDS_FIXTURE);
    given('isVisible', () => true);

    it('등록 모달에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toHaveTextContent('제목 없음 등록');
    });

    describe('닫기 버튼을 클릭한다', () => {
      it('dispatch "setPublishModalVisible" 액션이 호출되어야만 한다', () => {
        renderPublishModalContainer();

        fireEvent.click(screen.getByText('닫기'));

        expect(dispatch).toBeCalledWith({
          type: 'group/setPublishModalVisible',
          payload: false,
        });
      });
    });

    describe('"등록하기" 버튼을 클릭한다', () => {
      it('dispatch 액션이 호출되어야만 한다', () => {
        renderPublishModalContainer();

        fireEvent.click(screen.getByText('등록하기'));

        expect(dispatch).toBeCalled();
      });
    });

    describe('태그를 입력한다', () => {
      it('dispatch "changeWriteFields" 이벤트가 발생해야만 한다', () => {
        renderPublishModalContainer();

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

  context('모달창이 보이지 않는 경우', () => {
    given('writeFields', () => WRITE_FIELDS_FIXTURE);
    given('isVisible', () => false);

    it('아무것도 렌더링 되지 말아야 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
