import { render, screen } from '@testing-library/react';

import palette from '@/styles/palette';

import MyInfoTab from './MyInfoTab';

describe('MyInfoTab', () => {
  const renderMyInfoTab = () => render((
    <MyInfoTab activeTab="setting" />
  ));

  context('active 상태인 경우', () => {
    it(`링크의 border color가 ${palette.success10} 이어야만 한다`, () => {
      renderMyInfoTab();

      expect(screen.getByText('내 정보 수정')).toHaveStyle({
        'border-bottom': `2px solid ${palette.foreground}`,
      });
    });
  });

  context('active 상태가 아닌 경우', () => {
    it('링크의 border color가 "transparent" 이어야만 한다', () => {
      renderMyInfoTab();

      expect(screen.getByText('모집한 팀')).toHaveStyle({
        'border-bottom': '2px solid transparent',
      });
    });
  });
});
