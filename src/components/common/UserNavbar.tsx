import React, {
  memo, ReactElement, useRef, useState,
} from 'react';
import { Bell as AlarmIcon } from 'react-feather';
import { useClickAway } from 'react-use';

import styled from '@emotion/styled';
import Link from 'next/link';
import { isEmpty } from 'ramda';

import useFetchAlertAlarms from '@/hooks/api/alarm/useFetchAlertAlarms';
import { Profile } from '@/models/auth';
import palette from '@/styles/palette';

import Button from './Button';
import DropDown from './DropDown';
import ProfileImage from './ProfileImage';

interface Props {
  user: Profile;
  signOut: () => void;
}

function UserNavbar({ user, signOut }: Props): ReactElement {
  const { data: alertAlarms } = useFetchAlertAlarms();
  const [isVisible, setVisible] = useState<boolean>(false);
  const userIconRef = useRef<HTMLDivElement>(null);

  useClickAway(userIconRef, () => setVisible(false), ['mousedown', 'scroll', 'touchstart']);

  return (
    <UserNavbarWrapper>
      <Button
        size="small"
        href="/write"
      >
        팀 모집하기
      </Button>
      <Link href="/alarm" passHref>
        <AlarmLink className="alarm-icon">
          {!isEmpty(alertAlarms) && (
            <AlertAlarmStatus data-testid="alarm-status">
              {alertAlarms.length}
            </AlertAlarmStatus>
          )}
          <AlarmIcon color={palette.accent6} />
        </AlarmLink>
      </Link>
      <div className="profile-dropdown-wrapper" ref={userIconRef}>
        <ProfileImage
          src={user.image}
          onClick={() => setVisible(!isVisible)}
        />
        <DropDown
          signOut={signOut}
          name={user.name}
          email={user.email as string}
          isVisible={isVisible}
        />
      </div>
    </UserNavbarWrapper>
  );
}

export default memo(UserNavbar);

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

const AlarmLink = styled.a`
  position: relative;
`;

const AlertAlarmStatus = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  text-align: center;
  background-color: ${palette.warning};
  color: ${palette.background};
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 16px;
`;
