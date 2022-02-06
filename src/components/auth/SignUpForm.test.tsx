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

  it('SignUp form에 대한 항목이 나타나야 한다', () => {
    renderSignUpForm(userFields);
    const labels = ['닉네임', '이메일', '포트폴리오 URL (선택)', '포지션'];

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
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
        it('"닉네임을 입력해주세요." 에러 메시지가 보여진다', async () => {
          const { container } = renderSignUpForm({
            ...userFields,
            displayName: '',
          });

          const button = screen.getByText('확인');

          expect(button).not.toBeNull();

          await act(async () => {
            await fireEvent.submit(button);
          });

          expect(container).toHaveTextContent('닉네임을 입력해주세요.');
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
        });
      });
    });
  });
});
