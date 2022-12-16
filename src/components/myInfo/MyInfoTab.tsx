import { ReactElement } from 'react';

import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { ActiveMyInfoTab } from '@/containers/myInfo/MyInfoTabContainer';
import { body1Font, h4Font } from '@/styles/fontStyles';
import mq, { mobileMediaQuery } from '@/styles/responsive';
import zIndexes from '@/styles/zIndexes';

interface Props {
  activeTab: ActiveMyInfoTab;
  numberAppliedGroups: number;
  numberRecruitedGroups: number;
}

function MyInfoTab({ activeTab, numberAppliedGroups, numberRecruitedGroups }: Props): ReactElement {
  return (
    <MyInfoNav>
      <MyInfoNavItem
        href="/myinfo/setting"
        pathName="setting"
        activeTab={activeTab}
      >
        내 정보 수정
      </MyInfoNavItem>
      <MyInfoNavItem
        href="/myinfo/recruited"
        pathName="recruited"
        activeTab={activeTab}
      >
        {`모집한 팀 ${numberRecruitedGroups}`}
      </MyInfoNavItem>
      <MyInfoNavItem
        href="/myinfo/applied"
        pathName="applied"
        activeTab={activeTab}
      >
        {`신청한 팀 ${numberAppliedGroups}`}
      </MyInfoNavItem>
    </MyInfoNav>
  );
}

export default MyInfoTab;

const MyInfoNavItem = styled(Link, { shouldForwardProp: (prop) => prop !== 'pathName' && prop !== 'activeTab' })<{ pathName: ActiveMyInfoTab; activeTab: ActiveMyInfoTab; }>`
  transition: border-color .2s ease-in-out;
  ${mq({
    padding: ['11px 12px', '12px'],
  })};

  ${({ pathName, activeTab, theme }) => (pathName === activeTab ? css`
    border-bottom: 2px solid ${theme.foreground};
    ${mobileMediaQuery} {
      ${body1Font(true)};
    }

    ${h4Font(true)};
  ` : css`
    ${mobileMediaQuery} {
      ${body1Font()};
    }

    ${h4Font()};
    border-bottom: 2px solid transparent;
    color: ${theme.accent6};
  `)};
`;

const MyInfoNav = styled.nav`
  position: sticky;
  z-index: ${zIndexes.MyInfoNavTab};
  top: 64px;
  box-shadow: 0px 1px 0px ${({ theme }) => theme.accent2};
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > :not(a:last-of-type) {
  ${mq({
    marginRight: ['0', '16px'],
  })};
  }
`;
