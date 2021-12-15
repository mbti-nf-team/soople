import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import WriteHeaderContainer from './WriteHeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('WriteHeaderContainer', () => {
  const dispatch = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockReplace.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        groupId: given.groupId,
        writeFields: given.writeFields,
      },
    }));
  });

  const renderWriteHeaderContainer = () => render((
    <WriteHeaderContainer />
  ));

  context('글을 작성하지 않은 경우', () => {
    given('groupId', () => null);

    context('제목이 작성되지 않은 경우', () => {
      given('writeFields', () => ({
        title: '',
      }));

      describe('"등록하기" 버튼을 클릭한다', () => {
        it('클릭 이베트가 발생해야만 한다', () => {
          renderWriteHeaderContainer();

          fireEvent.click(screen.getByText('등록하기'));

          expect(dispatch).not.toBeCalled();
        });
      });
    });

    context('제목이 작성된 경우', () => {
      given('writeFields', () => ({
        title: 'title',
      }));

      describe('"등록하기" 버튼을 클릭한다', () => {
        it('클릭 이베트가 발생해야만 한다', () => {
          renderWriteHeaderContainer();

          fireEvent.click(screen.getByText('등록하기'));

          expect(dispatch).toBeCalledWith({
            type: 'group/setPublishModalVisible',
            payload: true,
          });
        });
      });
    });
  });

  context('이미 글을 작성한 경우', () => {
    given('groupId', () => '1');
    given('writeFields', () => ({
      title: 'title',
    }));

    beforeEach(() => {
      (useRouter as jest.Mock).mockImplementationOnce(() => ({
        replace: mockReplace,
      }));
    });

    it('"router.replace"가 "/"와 같이 호출되어야만 한다', async () => {
      renderWriteHeaderContainer();

      expect(mockReplace).toBeCalledWith('/detail/1');
    });
  });
});
