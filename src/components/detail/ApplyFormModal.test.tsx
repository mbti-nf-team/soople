import { act } from 'react-dom/test-utils';

import { fireEvent, screen } from '@testing-library/react';

import renderWithPortal from '@/test/renderWithPortal';

import ApplyFormModal from './ApplyFormModal';

describe('ApplyFormModal', () => {
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleSubmit.mockClear();
    handleClose.mockClear();
  });

  const renderApplyFormModal = () => renderWithPortal((
    <ApplyFormModal
      isVisible
      initPortfolioUrl=""
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  ));

  describe('포트폴리오 인풋의 clear 버튼을 클릭한다', () => {
    it('포트폴리오 인풋의 값이 없어저야만 한다', async () => {
      renderApplyFormModal();

      const input = screen.getByPlaceholderText('URL을 입력하세요');

      await act(async () => {
        await fireEvent.change(input, {
          target: { value: 'Text' },
        });

        fireEvent.click(screen.getByTestId('clear-icon'));
      });

      expect(input).toHaveValue('');
    });
  });

  describe('"신청하기" 버튼을 클릭한다', () => {
    context('소개글을 입력한 경우', () => {
      const textareaValue = '소개글';

      it('클릭 이벤트가 발생해야만 한다', async () => {
        renderApplyFormModal();

        await act(async () => {
          await fireEvent.change(screen.getByPlaceholderText('간단한 소개글을 입력하세요'), {
            target: { value: textareaValue },
          });

          fireEvent.submit(screen.getByText('신청하기'));
        });

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });

    context('소개글을 입력하지 않은 경우', () => {
      it('"소개글을 입력해주세요."문구가 나타나야만 한다', async () => {
        const { container } = renderApplyFormModal();

        await act(async () => {
          fireEvent.submit(screen.getByText('신청하기'));
        });

        expect(container).toHaveTextContent('소개글을 입력해주세요.');
      });
    });
  });

  describe('"닫기" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderApplyFormModal();

      fireEvent.click(screen.getByText('닫기'));

      expect(handleClose).toBeCalledTimes(1);
    });
  });
});
