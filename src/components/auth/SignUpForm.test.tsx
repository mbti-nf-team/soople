import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import { User } from 'firebase/auth';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleSubmit.mockClear();
  });

  const userFields = {
    displayName: 'test',
    email: 'test@test.com',
    photoURL: 'https://test.test',
  } as User;

  const renderSignUpForm = (fields: User) => render((
    <SignUpForm
      onSubmit={handleSubmit}
      fields={fields}
    />
  ));

  describe('닉네임 인풋의 clear 버튼을 클릭한다', () => {
    it('닉네임 인풋의 값이 없어저야만 한다', async () => {
      renderSignUpForm(userFields);

      const input = screen.getByPlaceholderText('닉네임을 입력해주세요');

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
      renderSignUpForm(userFields);

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

  describe('"확인" 버튼을 클릭한다', () => {
    context('submit 호출에 성공했을 때', () => {
      it('submit에 대한 액션이 호출된다', async () => {
        renderSignUpForm(userFields);

        const button = screen.getByText('확인');

        expect(button).not.toBeNull();

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
      context('닉네임을 입력하지 않은 경우', () => {
        it('버튼은 disabled이어야만 한다', async () => {
          renderSignUpForm({
            ...userFields,
            displayName: '',
          });

          const button = screen.getByText('확인');

          expect(button).not.toBeNull();

          await act(async () => {
            await fireEvent.submit(button);
          });

          expect(handleSubmit).not.toBeCalled();
          expect(button).toHaveAttribute('disabled');
        });
      });

      context('포지션을 선택하지 않은 경우', () => {
        it('submit 액션이 호출되지 않아야만 한다', async () => {
          renderSignUpForm(userFields);

          const button = screen.getByText('확인');

          expect(button).not.toBeNull();

          await act(async () => {
            await fireEvent.submit(button);
          });

          expect(handleSubmit).not.toBeCalled();
          expect(button).toHaveAttribute('disabled');
        });
      });
    });
  });
});
