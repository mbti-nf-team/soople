import { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import type { ActiveMyInfoTab } from '@/containers/myInfo/MyInfoTabContainer';
import { h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

interface Props {
  activeTab: ActiveMyInfoTab;
}

function MyInfoTab({ activeTab }: Props): ReactElement {
  return (
    <MyInfoNav>
      <Link href="/myinfo/setting" passHref>
        <StyledLink pathName="setting" activeTab={activeTab}>내 정보 수정</StyledLink>
      </Link>
      <Link href="/myinfo/recruited" passHref>
        <StyledLink pathName="recruited" activeTab={activeTab}>모집한 팀</StyledLink>
      </Link>
      <Link href="/myinfo/applied" passHref>
        <StyledLink pathName="applied" activeTab={activeTab}>신청한 팀</StyledLink>
      </Link>
    </MyInfoNav>
  );
}

export default MyInfoTab;

const StyledLink = styled.a<{ pathName: ActiveMyInfoTab; activeTab: ActiveMyInfoTab; }>`
  transition: border-color .2s ease-in-out;
  padding: 9px 12px;
  ${({ pathName, activeTab }) => (pathName === activeTab ? css`
    border-bottom: 2px solid ${palette.foreground};
    ${h4Font(true)}
  ` : css`
    ${h4Font()}
    border-bottom: 2px solid transparent;
    color: ${palette.accent6};
  `)};

`;

const MyInfoNav = styled.nav`
  position: sticky;
  top: 64px;
  box-shadow: 0px 1px 0px ${palette.accent2};
  background: ${palette.background};
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > :not(a:last-of-type) {
    margin-right: 16px;
  }
`;
