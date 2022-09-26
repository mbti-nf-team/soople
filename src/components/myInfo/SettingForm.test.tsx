import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import SettingForm from './SettingForm';

describe('SettingForm', () => {
  const handleWithdrawal = jest.fn();

  beforeEach(() => {
    handleWithdrawal.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderSettingForm = () => render((
    <SettingForm
      user={{
        ...FIXTURE_PROFILE,
        position: given.position,
      }}
      onWithdrawal={handleWithdrawal}
    />
  ));

  context('포지션이 존재하지 않는 경우', () => {
    given('position', () => null);

    it('"포지션을 입력 또는 선택해주세요."가 나타나야만 한다', () => {
      const { container } = renderSettingForm();

      expect(container).toHaveTextContent('포지션을 입력 또는 선택해주세요.');
    });
  });

  context('포지션이 존재하는 경우', () => {
    given('position', () => '프론트엔드');

    it('포지션이 나타나야만 한다', () => {
      const { container } = renderSettingForm();

      expect(container).toHaveTextContent('프론트엔드');
    });
  });

  describe('"회원 탈퇴하기" 버튼을 클릭한다', () => {
    it('회원 탈퇴 모달창이 나타나야만 한다', () => {
      const { container } = renderSettingForm();

      fireEvent.click(screen.getByText('회원 탈퇴하기'));

      expect(container).toHaveTextContent('탈퇴하시면 내 정보에 등록된 계정 정보가 모두 삭제돼요.');
    });
  });

  describe('회원 탈퇴 모달창에서 "닫기" 버튼을 클릭한다', () => {
    it('모달창이 안보여야만 한다', () => {
      const { container } = renderSettingForm();

      fireEvent.click(screen.getByText('회원 탈퇴하기'));
      fireEvent.click(screen.getByText('닫기'));

      act(() => {
        jest.advanceTimersByTime(400);
      });

      expect(container).not.toHaveTextContent('탈퇴하시면 내 정보에 등록된 계정 정보가 모두 삭제돼요.');
    });
  });

  describe('회원 탈퇴 모달창에서 "탈퇴하기" 버튼을 클릭한다', () => {
    it('클릭 이벤트가 호출되어야만 한다', () => {
      renderSettingForm();

      fireEvent.click(screen.getByText('회원 탈퇴하기'));
      fireEvent.click(screen.getByText('탈퇴하기'));

      expect(handleWithdrawal).toBeCalled();
    });
  });
});
