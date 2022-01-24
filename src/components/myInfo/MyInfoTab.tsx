import { ReactElement } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';

import palette from '@/styles/palette';

export type MyInfoNavActive = 'setting' | 'recruited' | 'applied';

interface Props {
  active: MyInfoNavActive;
}

function MyInfoTab({ active }: Props): ReactElement {
  return (
    <nav>
      <Link href="/myinfo/setting" passHref>
        <StyledLink pathName="setting" active={active}>내 정보 수정</StyledLink>
      </Link>
      <Link href="/myinfo/recruited" passHref>
        <StyledLink pathName="recruited" active={active}>모집한 팀</StyledLink>
      </Link>
      <Link href="/myinfo/applied" passHref>
        <StyledLink pathName="applied" active={active}>신청한 팀</StyledLink>
      </Link>
    </nav>
  );
}

export default MyInfoTab;

const StyledLink = styled.a<{ pathName: MyInfoNavActive; active: MyInfoNavActive; }>`
  border-bottom: 2px solid ${({ pathName, active }) => (pathName === active ? palette.success10 : 'transparent')};
  transition: border-color .2s ease-in-out;
`;
