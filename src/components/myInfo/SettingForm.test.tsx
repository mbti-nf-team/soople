import { act, fireEvent, screen } from '@testing-library/react';

import renderWithPortal from '@/test/renderWithPortal';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import SettingForm from './SettingForm';

describe('SettingForm', () => {
  const handleWithdrawal = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderSettingForm = () => renderWithPortal((
    <SettingForm
      user={{
        ...FIXTURE_PROFILE,
        position: given.position,
      }}
      onWithdrawal={handleWithdrawal}
      onSubmit={handleSubmit}
      isLoading={false}
    />
  ));

  context('포지션이 존재하지 않는 경우', () => {
    given('position', () => null);

    it('"포지션을 입력 또는 선택해주세요."가 나타나야만 한다', async () => {
      const { container } = renderSettingForm();

      await act(() => expect(container).toHaveTextContent('포지션을 입력 또는 선택해주세요.'));
    });
  });

  context('포지션이 존재하는 경우', () => {
    given('position', () => '프론트엔드');

    it('포지션이 나타나야만 한다', async () => {
      const { container } = renderSettingForm();

      await act(() => expect(container).toHaveTextContent('프론트엔드'));
    });

    context('"포지션을 변경하면"', () => {
      it('포지션이 변경되어야만 한다', async () => {
        const { container } = renderSettingForm();

        const input = screen.getByRole('combobox');

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.click(screen.getByText('백엔드'));

        await act(() => expect(container).toHaveTextContent('백엔드'));
      });
    });
  });

  describe('닉네임 인풋의 clear 버튼을 클릭한다', () => {
    given('position', () => '프론트엔드');

    it('닉네임 인풋의 값이 없어저야만 한다', async () => {
      renderSettingForm();

      const input = screen.getByPlaceholderText('닉네임을 입력하세요');

      await act(async () => {
        screen.getAllByTestId('clear-icon').forEach((inputTag) => {
          fireEvent.click(inputTag);
        });
      });

      expect(input).toHaveValue('');
    });
  });

  describe('포트폴리오 인풋의 clear 버튼을 클릭한다', () => {
    it('포트폴리오 인풋의 값이 없어저야만 한다', async () => {
      renderSettingForm();

      const input = screen.getByPlaceholderText('URL을 입력하세요');

      await act(async () => {
        await fireEvent.change(input, {
          target: { value: 'Text' },
        });

        screen.getAllByTestId('clear-icon').forEach((inputTag) => {
          fireEvent.click(inputTag);
        });
      });

      expect(input).toHaveValue('');
    });
  });

  describe('"저장하기" 버튼을 클릭한다', () => {
    context('submit 호출에 성공했을 때', () => {
      given('position', () => '프론트엔드');

      it('submit에 대한 액션이 호출된다', async () => {
        renderSettingForm();

        const button = screen.getByText('저장하기');
        const input = screen.getByRole('combobox');

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.click(screen.getByText('백엔드'));

        await act(async () => {
          fireEvent.submit(button);
        });

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });

    context('submit 호출에 실패했을 때', () => {
      given('position', () => undefined);

      it('버튼은 disabled이어야만 한다', async () => {
        renderSettingForm();

        const button = screen.getByText('저장하기');

        expect(button).not.toBeNull();

        await act(async () => {
          await fireEvent.submit(button);
        });

        expect(button).toHaveAttribute('disabled');
      });
    });
  });

  describe('"회원 탈퇴하기" 버튼을 클릭한다', () => {
    it('회원 탈퇴 모달창이 나타나야만 한다', async () => {
      const { container } = renderSettingForm();

      fireEvent.click(screen.getByText('회원 탈퇴하기'));

      await act(() => expect(container).toHaveTextContent('탈퇴하시면 내 정보에 등록된 계정 정보가 모두 삭제돼요.'));
    });
  });

  describe('회원 탈퇴 모달창에서 "닫기" 버튼을 클릭한다', () => {
    it('모달창이 안보여야만 한다', async () => {
      const { container } = renderSettingForm();

      fireEvent.click(screen.getByText('회원 탈퇴하기'));
      fireEvent.click(screen.getByText('닫기'));

      act(() => {
        jest.advanceTimersByTime(400);
      });

      await act(() => expect(container).not.toHaveTextContent('탈퇴하시면 내 정보에 등록된 계정 정보가 모두 삭제돼요.'));
    });
  });

  describe('회원 탈퇴 모달창에서 "탈퇴하기" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 호출되어야만 한다', async () => {
      renderSettingForm();

      fireEvent.click(screen.getByText('회원 탈퇴하기'));
      fireEvent.click(screen.getByText('탈퇴하기'));

      await act(() => expect(handleWithdrawal).toBeCalled());
    });
  });
});
