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
    const title = '제목입니다.';

    given('writeFields', () => ({
      ...WRITE_FIELDS_FIXTURE,
      title,
    }));
    given('isVisible', () => true);

    it('등록 모달에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toHaveTextContent(`${title} 등록`);
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

    describe('분류를 선택한다', () => {
      it('changeFields 이벤트가 발생해야만 한다', () => {
        renderPublishModalContainer();

        fireEvent.change(screen.getByDisplayValue('분류를 선택해주세요.'), {
          target: { value: 'study' },
        });

        expect(dispatch).toBeCalledWith({
          type: 'group/changeWriteFields',
          payload: {
            value: 'study',
            name: 'category',
          },
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
