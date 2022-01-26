import { ReactElement } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { h4Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

export type MyInfoNavActive = 'setting' | 'recruited' | 'applied';

interface Props {
  active: MyInfoNavActive;
}

function MyInfoTab({ active }: Props): ReactElement {
  return (
    <MyInfoNav>
      <Link href="/myinfo/setting" passHref>
        <StyledLink pathName="setting" active={active}>내 정보 수정</StyledLink>
      </Link>
      <Link href="/myinfo/recruited" passHref>
        <StyledLink pathName="recruited" active={active}>모집한 팀</StyledLink>
      </Link>
      <Link href="/myinfo/applied" passHref>
        <StyledLink pathName="applied" active={active}>신청한 팀</StyledLink>
      </Link>
    </MyInfoNav>
  );
}

export default MyInfoTab;

const StyledLink = styled.a<{ pathName: MyInfoNavActive; active: MyInfoNavActive; }>`
  transition: border-color .2s ease-in-out;
  padding: 9px 12px;
  ${({ pathName, active }) => (pathName === active ? css`
    border-bottom: 2px solid ${palette.foreground};
    ${h4Font(true)}
  ` : css`
    ${h4Font()}
    border-bottom: 2px solid transparent;
    color: ${palette.accent6};
  `)};

`;

const MyInfoNav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-shadow: 0px 1px 0px ${palette.accent2};

    & > :not(a:last-of-type) {
    margin-right: 16px;
  }

`;
