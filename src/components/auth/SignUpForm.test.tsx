import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { Profile } from '@/models/auth';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const handleSubmit = jest.fn();

  const renderSignUpForm = (fields: Profile) => render((
    <SignUpForm
      onSubmit={handleSubmit}
      fields={fields}
    />
  ));

  it('SignUp form에 대한 항목이 나타나야 한다', () => {
    renderSignUpForm(PROFILE_FIXTURE);
    const labels = ['닉네임', '이메일', '포트폴리오 URL (선택)', '포지션'];

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });

  context('포지션 "직접 입력" 상태일 때', () => {
    it('포지션 직접 입력 input창이 나타나야만 한다', async () => {
      renderSignUpForm(PROFILE_FIXTURE);

      await act(async () => {
        await fireEvent.change(screen.getByDisplayValue(/포지션을 션택하세요/), {
          target: { value: 'directInput' },
        });
      });

      expect(screen.getByPlaceholderText('포지션을 입력해주세요.')).not.toBeNull();
    });

    describe('"X" 버튼을 클릭한다', () => {
      it('포지션 입력 input창이 사라져야만 한다', async () => {
        renderSignUpForm(PROFILE_FIXTURE);

        await act(async () => {
          await fireEvent.change(screen.getByDisplayValue(/포지션을 션택하세요/), {
            target: { value: 'directInput' },
          });
        });

        fireEvent.change(screen.getByPlaceholderText('포지션을 입력해주세요.'), {
          target: { value: 'test' },
        });
        fireEvent.click(screen.getByText('x'));

        expect(screen.queryByPlaceholderText('포지션을 입력해주세요.')).toBeNull();
      });
    });
  });

  describe('"확인" 버튼을 클릭한다', () => {
    context('submit 호출에 성공했을 때', () => {
      it('submit에 대한 액션이 호출된다', async () => {
        renderSignUpForm(PROFILE_FIXTURE);

        const button = screen.getByText('확인');

        expect(button).not.toBeNull();

        await act(async () => {
          await fireEvent.change(screen.getByDisplayValue(/포지션을 션택하세요/), {
            target: { value: 'frontEnd' },
          });
          await fireEvent.submit(button);
        });

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });

    context('submit 호출에 실패했을 때', () => {
      context('닉네임을 입력하지 않은 경우', () => {
        it('"닉네임을 입력해주세요." 에러 메시지가 보여진다', async () => {
          const { container } = renderSignUpForm({
            ...PROFILE_FIXTURE,
            name: '',
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
        it('"포지션을 선택해주세요." 에러 메시지가 보여진다', async () => {
          const { container } = renderSignUpForm({
            ...PROFILE_FIXTURE,
            position: '',
          });

          const button = screen.getByText('확인');

          expect(button).not.toBeNull();

          await act(async () => {
            await fireEvent.submit(button);
          });

          expect(container).toHaveTextContent('포지션을 선택해주세요.');
        });
      });
    });
  });
});
