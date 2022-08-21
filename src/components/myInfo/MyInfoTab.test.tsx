import { render, screen } from '@testing-library/react';

import { lightTheme } from '@/styles/theme';
import MockTheme from '@/test/MockTheme';

import MyInfoTab from './MyInfoTab';

describe('MyInfoTab', () => {
  const renderMyInfoTab = () => render((
    <MockTheme>
      <MyInfoTab
        activeTab="setting"
        numberAppliedGroups={3}
        numberRecruitedGroups={3}
      />
    </MockTheme>
  ));

  context('active 상태인 경우', () => {
    it(`링크의 border color가 ${lightTheme.success10} 이어야만 한다`, () => {
      renderMyInfoTab();

      expect(screen.getByText('내 정보 수정')).toHaveStyle({
        'border-bottom': `2px solid ${lightTheme.foreground}`,
      });
    });
  });

  context('active 상태가 아닌 경우', () => {
    it('링크의 border color가 "transparent" 이어야만 한다', () => {
      renderMyInfoTab();

      expect(screen.getByText('모집한 팀 3')).toHaveStyle({
        'border-bottom': '2px solid transparent',
      });
    });
  });
});
