import { fireEvent, render, screen } from '@testing-library/react';

import palette from '@/styles/palette';
import { yesterday } from '@/utils/utils';

import FIXTURE_GROUP from '../../../fixtures/group';

import MyGroup from './MyGroup';

describe('MyGroup', () => {
  const handleClick = jest.fn();

  const renderMyGroup = () => render((
    <MyGroup
      onClick={handleClick}
      group={given.group}
    />
  ));

  context('썸네일과 짧은 소개글이 존재하는 경우', () => {
    given('group', () => ({
      ...FIXTURE_GROUP,
      thumbnail: 'www.test.com',
      shortDescription: '짧은 소개글',
    }));

    it('썸네일과 짧은 소개글이 나타나야만 한다', () => {
      const { container } = renderMyGroup();

      expect(screen.getByAltText('thumbnail')).toBeInTheDocument();
      expect(container).toHaveTextContent('짧은 소개글');
    });
  });

  context('isCompleted가 true일 경우', () => {
    given('group', () => ({
      ...FIXTURE_GROUP,
      isCompleted: true,
      numberApplicants: 1,
    }));

    it('신청자 수는 "몇 명"이 나타나야만 한다', () => {
      const { container } = renderMyGroup();

      expect(container).toHaveTextContent(/1명/);
    });
  });

  context('isCompleted가 false일 경우', () => {
    given('group', () => ({
      ...FIXTURE_GROUP,
      isCompleted: false,
      numberApplicants: 2,
    }));

    it('신청자 수는 "몇 명 신청 중"이 나타나야만 한다', () => {
      const { container } = renderMyGroup();

      expect(container).toHaveTextContent(/2명 신청 중/);
    });
  });

  describe('group을 클릭한다', () => {
    given('group', () => (FIXTURE_GROUP));

    it('클릭 이벤트가 호출되어야만 한다', () => {
      renderMyGroup();

      fireEvent.click(screen.getByText(FIXTURE_GROUP.title));

      expect(handleClick).toBeCalledWith(FIXTURE_GROUP.groupId);
    });
  });

  describe('모집 상태가 모집 마감된 상태일 때 스타일이 변경된다', () => {
    given('group', () => ({
      ...FIXTURE_GROUP,
      recruitmentEndSetting: 'automatic',
      recruitmentEndDate: yesterday(new Date()),
    }));

    it(`모집 상태의 color가 ${palette.accent6}이어야만 한다`, () => {
      renderMyGroup();

      expect(screen.getByTestId('date-status')).toHaveStyle({
        color: palette.accent6,
      });
    });
  });
});
