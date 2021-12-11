import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import NewHeaderContainer from './NewHeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NewHeaderContainer', () => {
  const dispatch = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockReplace.mockClear();

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);
    (useSelector as jest.Mock).mockImplementationOnce((selector) => selector({
      groupReducer: {
        groupId: given.groupId,
      },
    }));
  });

  const renderNewHeaderContainer = () => render((
    <NewHeaderContainer />
  ));

  it('헤더 정보가 나타나야만 한다', () => {
    const { container } = renderNewHeaderContainer();

    expect(container).toHaveTextContent('등록하기');
  });

  context('글을 작성하지 않은 경우', () => {
    given('groupId', () => null);

    describe('"등록하기" 버튼을 클릭한다', () => {
      it('클릭 이베트가 발생해야만 한다', () => {
        renderNewHeaderContainer();

        fireEvent.click(screen.getByText('등록하기'));

        expect(dispatch).toBeCalledWith({
          type: 'group/setPublishModalVisible',
          payload: true,
        });
      });
    });
  });

  context('이미 글을 작성한 경우', () => {
    given('groupId', () => '1');

    beforeEach(() => {
      (useRouter as jest.Mock).mockImplementationOnce(() => ({
        replace: mockReplace,
      }));
    });

    it('"router.replace"가 "/"와 같이 호출되어야만 한다', async () => {
      renderNewHeaderContainer();

      expect(mockReplace).toBeCalledWith('/');
    });
  });
});
