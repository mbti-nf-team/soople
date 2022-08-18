import { fireEvent, render, screen } from '@testing-library/react';

import { groupsConditionState } from '@/recoil/group/atom';
import palette from '@/styles/palette';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import RecoilObserver from '@/test/RecoilObserver';

import HeaderWrapper from './HeaderWrapper';

jest.mock('next/link', () => ({ children }: any) => children);

describe('HeaderWrapper', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderHeaderWrapper = () => render((
    <InjectTestingRecoilState>
      <>
        <RecoilObserver node={groupsConditionState} onChange={handleChange} />
        <HeaderWrapper
          hasBackground={given.hasBackground}
          isScrollTop={given.isScrollTop}
          testId="test-id"
        />
      </>
    </InjectTestingRecoilState>
  ));

  describe('로고를 클릭한다', () => {
    it('프로젝트 스터디 목록 필터 state가 변경되는 이벤트가 호출되어야만 한다', () => {
      renderHeaderWrapper();

      fireEvent.click(screen.getByTestId('logo-icon'));

      expect(handleChange).toBeCalledWith({
        isFilterCompleted: false,
        category: ['study', 'project'],
        tag: '',
      });
    });
  });

  context('hasBackground가 true인 경우', () => {
    given('hasBackground', () => true);

    it(`background 속성이 ${palette.accent1}이어야 한다`, () => {
      renderHeaderWrapper();

      expect(screen.getByTestId('test-id')).toHaveStyle({
        background: palette.accent1,
      });
    });
  });

  context('hasBackground가 false인 경우', () => {
    given('hasBackground', () => false);

    it(`background 속성이 ${palette.background}이어야 한다`, () => {
      renderHeaderWrapper();

      expect(screen.getByTestId('test-id')).toHaveStyle({
        background: palette.background,
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

      it(`box-shadow 속성이 ${palette.accent2} 이어야 한다`, () => {
        renderHeaderWrapper();

        expect(screen.getByTestId('test-id')).toHaveStyle({
          'box-shadow': `0 1px 0 0 ${palette.accent2}`,
        });
      });
    });
  });
});
