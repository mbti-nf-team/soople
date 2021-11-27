import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { Profile } from '@/models/auth';

import PROFILE_FIXTURE from '../../fixtures/profile';

import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  const handleSubmit = jest.fn();

  const renderRegisterForm = (fields: Profile) => render((
    <RegisterForm
      onSubmit={handleSubmit}
      fields={fields}
    />
  ));

  it('Input 창이 나타난다', () => {
    renderRegisterForm(PROFILE_FIXTURE);
    const labels = ['이름', '이메일', '아이디', '포트폴리오 URL (선택)'];

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });

  describe('"저장" 버튼을 클릭한다', () => {
    context('submit 호출에 성공했을 때', () => {
      it('submit에 대한 액션이 호출된다', async () => {
        renderRegisterForm(PROFILE_FIXTURE);

        const button = screen.getByText('저장');

        expect(button).not.toBeNull();

        await act(async () => {
          await fireEvent.submit(button);
        });

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });

    context('submit 호출에 실패했을 때', () => {
      context('이름을 입력하지 않은 경우', () => {
        it('"이름을 입력해주세요." 에러 메시지가 보여진다', async () => {
          const { container } = renderRegisterForm({
            ...PROFILE_FIXTURE,
            displayName: '',
          });

          const button = screen.getByText('저장');

          expect(button).not.toBeNull();

          await act(async () => {
            await fireEvent.submit(button);
          });

          expect(container).toHaveTextContent('이름을 입력해주세요.');
        });
      });

      describe('아이디를 입력하지 않는다', () => {
        it('"아이디를 입력해주세요." 에러 메시지가 보여진다', async () => {
          const { container } = renderRegisterForm({
            ...PROFILE_FIXTURE,
            id: '',
          });

          const button = screen.getByText('저장');

          expect(button).not.toBeNull();

          await act(async () => {
            await fireEvent.submit(button);
          });

          expect(container).toHaveTextContent('아이디를 입력해주세요.');
        });
      });
    });
  });
});
