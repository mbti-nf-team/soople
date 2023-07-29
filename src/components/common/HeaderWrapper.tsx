import {
  memo, PropsWithChildren, ReactElement,
} from 'react';

import Link from 'next/link';

import styled from '@emotion/styled';
import { useLessThenScrollY } from '@nft-team/react';
import { useSetRecoilState } from 'recoil';

import { groupsConditionState } from '@/recoil/group/atom';
import Layout from '@/styles/Layout';
import { mq2 } from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';

import LogoSvg from '../../assets/icons/img_logo_soople.svg';

interface Props {
  hasBackground: boolean;
  isScrollTop: boolean;
  testId?: string;
}

function HeaderWrapper({
  hasBackground, isScrollTop, testId, children,
}: PropsWithChildren<Props>):ReactElement {
  const setGroupsCondition = useSetRecoilState(groupsConditionState);
  const isLessThenScrollY = useLessThenScrollY(336);

  const onClickLogo = () => setGroupsCondition((prev) => ({
    ...prev,
    category: ['study', 'project'],
    tag: '',
  }));

  return (
    <>
      <HeaderBlock
        hasBackground={hasBackground && !isLessThenScrollY}
        isScrollTop={isScrollTop}
        data-testid={testId}
      >
        <HeaderContents>
          <Link href="/">
            <LogoIcon onClick={onClickLogo} data-testid="logo-icon" />
          </Link>
          {children}
        </HeaderContents>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default memo(HeaderWrapper);

const LogoIcon = styled(LogoSvg)`
  height: 24px;
`;

const HeaderBlock = styled.div<{ hasBackground: boolean; isScrollTop: boolean; }>`
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.TopNavigation};
  background: ${({ hasBackground, theme }) => (hasBackground ? theme.accent1 : theme.background)};
  box-shadow: 0 1px 0 0 ${({ isScrollTop, theme }) => (isScrollTop ? 'transparent' : theme.accent2)};
  transition: box-shadow .2s ease-in-out, background-color .2s ease-in-out;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const HeaderContents = styled(Layout)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  ${mq2({
    width: ['calc(100% - 3rem)', 'calc(100% - 3rem)', 'calc(100% - 3rem)', '800px', '1040px'],
  })};
`;
