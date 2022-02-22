import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import StatusBarContainer from './StatusBarContainer';

jest.mock('@/hooks/api/tagsCount/useFetchTagsCount');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('StatusBarContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchTagsCount as jest.Mock).mockImplementation(() => ({
      data: [{ name: 'javascript' }],
      isError: false,
      isLoading: false,
    }));
  });

  const renderStatusBarContainer = () => render((
    <InjectTestingRecoilState>
      <StatusBarContainer />
    </InjectTestingRecoilState>
  ));

  describe('필터 select를 변경한다', () => {
    context('category가 존재하지 않는 경우', () => {
      it('"전체"가 보여야만 한다', async () => {
        const { container } = renderStatusBarContainer();

        const input = screen.getByRole('combobox');

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });

        screen.getAllByText('전체').forEach((filter) => {
          fireEvent.click(filter);
        });

        await waitFor(() => expect(container).toHaveTextContent('전체'));
      });
    });

    context('filter가 존재하는 경우', () => {
      it('"스터디"가 보여야만 한다', async () => {
        const { container } = renderStatusBarContainer();

        const input = screen.getByRole('combobox');

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.click(screen.getByText('스터디'));

        await waitFor(() => expect(container).toHaveTextContent('스터디'));
      });
    });
  });

  describe('"모집 마감 안보기" switch 버튼을 클릭한다', () => {
    it('recoil set이 호출되어야만 한다', async () => {
      renderStatusBarContainer();

      const button = screen.getByTestId('switch-button');

      fireEvent.click(button);

      await waitFor(() => expect(button).toHaveAttribute('checked'));
    });
  });
});
