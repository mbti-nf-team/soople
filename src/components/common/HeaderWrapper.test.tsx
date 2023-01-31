import { PropsWithChildren } from 'react';

import {
  act, fireEvent, render, screen,
} from '@testing-library/react';

import { groupsConditionState } from '@/recoil/group/atom';
import { lightTheme } from '@/styles/theme';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import MockTheme from '@/test/MockTheme';
import RecoilObserver from '@/test/RecoilObserver';

import HeaderWrapper from './HeaderWrapper';

jest.mock('next/link', () => ({ children }: PropsWithChildren) => children);

describe('HeaderWrapper', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    jest.useFakeTimers();
  });

  const renderHeaderWrapper = () => render((
    <InjectTestingRecoilState>
      <MockTheme>
        <RecoilObserver node={groupsConditionState} onChange={handleChange} />
        <HeaderWrapper
          hasBackground={given.hasBackground}
          isScrollTop={given.isScrollTop}
          testId="test-id"
        />
      </MockTheme>
    </InjectTestingRecoilState>
  ));

  describe('로고를 클릭한다', () => {
    it('프로젝트 스터디 목록 필터 state가 변경되는 이벤트가 호출되어야만 한다', () => {
      renderHeaderWrapper();

      fireEvent.click(screen.getByTestId('logo-icon'));

      expect(handleChange).toHaveBeenCalledWith({
        isFilterCompleted: false,
        category: ['study', 'project'],
        tag: '',
      });
    });
  });

  context('hasBackground가 true이고 스크롤 높이가 336 초과인 경우', () => {
    given('hasBackground', () => true);

    it(`background 속성이 ${lightTheme.accent1}이어야 한다`, () => {
      renderHeaderWrapper();

      act(() => {
        fireEvent.scroll(window, { target: { scrollY: 400 } });
        jest.advanceTimersByTime(200);
      });

      expect(screen.getByTestId('test-id')).toHaveStyle({
        background: lightTheme.accent1,
      });
    });
  });

  context('hasBackground가 false인 경우', () => {
    given('hasBackground', () => false);

    it(`background 속성이 ${lightTheme.background}이어야 한다`, () => {
      renderHeaderWrapper();

      expect(screen.getByTestId('test-id')).toHaveStyle({
        background: lightTheme.background,
      });
    });
  });

  describe('스크롤 위치에 따라서 스타일이 변경된다', () => {
    context('scroll 위치가 최상단일 때', () => {
      given('isScrollTop', () => true);

      it('box-shadow 속성이 "transparent"이어야 한다', () => {
        renderHeaderWrapper();

        expect(screen.getByTestId('test-id')).toHaveStyle({
          'box-shadow': '0 1px 0 0 transparent',
        });
      });
    });

    context('scroll 위치가 최상단일 때', () => {
      given('isScrollTop', () => false);

      it(`box-shadow 속성이 ${lightTheme.accent2} 이어야 한다`, () => {
        renderHeaderWrapper();

        expect(screen.getByTestId('test-id')).toHaveStyle({
          'box-shadow': `0 1px 0 0 ${lightTheme.accent2}`,
        });
      });
    });
  });
});
