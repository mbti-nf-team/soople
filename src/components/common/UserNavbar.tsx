import React, {
  ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import { useUnmount } from 'react-use';

import styled from '@emotion/styled';
import { Session } from 'next-auth';

import Button from './Button';
import DropDown from './DropDown';
import ProfileImage from './ProfileImage';

interface Props {
  session: Session;
}

function UserNavbar({ session }: Props): ReactElement {
  const { user } = session;

  const [isVisible, setVisible] = useState<boolean>(false);
  const userIconRef = useRef<HTMLDivElement>(null);

  const handleDropdownOutside = useCallback((e) => {
    if (!userIconRef.current) {
      return;
    }

    if (userIconRef.current === e.target || userIconRef.current.contains(e.target)) {
      return;
    }

    setVisible(false);
  }, [userIconRef]);

  const addEventDropdown = useCallback((event: keyof DocumentEventMap) => {
    document.addEventListener(event, handleDropdownOutside);
  }, [handleDropdownOutside]);

  useEffect(() => {
    addEventDropdown('scroll');
    addEventDropdown('mousedown');
  }, [addEventDropdown]);

  useUnmount(() => {
    addEventDropdown('scroll');
    addEventDropdown('mousedown');
  });

  return (
    <UserNavbarWrapper>
      <Button
        size="small"
        href="/write"
      >
        팀 모집하기
      </Button>
      <div className="profile-dropdown-wrapper" ref={userIconRef}>
        <ProfileImage
          src={user?.image}
          onClick={() => setVisible(!isVisible)}
        />
        <DropDown
          name={user?.name}
          email={user.email}
          isVisible={isVisible}
        />
      </div>
    </UserNavbarWrapper>
  );
}

export default UserNavbar;

const UserNavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & a:first-of-type {
    margin-right: 24px;
  }

  .profile-dropdown-wrapper {
    position: relative;
  }
`;
