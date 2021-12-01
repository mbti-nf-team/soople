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

  it('Input 창이 나타난다', () => {
    renderSignUpForm(PROFILE_FIXTURE);
    const labels = ['닉네임', '이메일', '포트폴리오 URL (선택)'];

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });

  describe('"확인" 버튼을 클릭한다', () => {
    context('submit 호출에 성공했을 때', () => {
      it('submit에 대한 액션이 호출된다', async () => {
        renderSignUpForm(PROFILE_FIXTURE);

        const button = screen.getByText('확인');

        expect(button).not.toBeNull();

        await act(async () => {
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
    });
  });
});
