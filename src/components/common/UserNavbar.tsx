import React, {
  ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import { Bell as AlarmIcon } from 'react-feather';
import { useUnmount } from 'react-use';

import styled from '@emotion/styled';
import { User } from 'firebase/auth';
import Link from 'next/link';

import palette from '@/styles/palette';

import Button from './Button';
import DropDown from './DropDown';
import ProfileImage from './ProfileImage';

interface Props {
  user: User;
  signOut: () => void;
}

function UserNavbar({ user, signOut }: Props): ReactElement {
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
      <Link href="/alarm" passHref>
        <a className="alarm-icon">
          <AlarmIcon color={palette.accent6} />
        </a>
      </Link>
      <div className="profile-dropdown-wrapper" ref={userIconRef}>
        <ProfileImage
          src={user.photoURL}
          onClick={() => setVisible(!isVisible)}
        />
        <DropDown
          signOut={signOut}
          name={user.displayName}
          email={user.email as string}
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
  align-items: center;

  .alarm-icon {
    margin: 0 22px;
  }

  .profile-dropdown-wrapper {
    position: relative;
  }
`;
