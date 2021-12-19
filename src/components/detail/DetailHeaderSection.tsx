import React, { ReactElement } from 'react';

import dayjs from 'dayjs';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

dayjs.locale('ko');

interface Props {
  group: Group;
  currentTime: number;
}

function DetailHeaderSection({ group, currentTime }: Props): ReactElement {
  const { writer } = group;

  const recruitDate = useRecruitDateStatus(group, currentTime);

  return (
    <div>
      <h1>{group.title}</h1>
      <div>
        <ProfileImage
          src={writer.image}
          size="50px"
        />
        <span>
          {emptyAThenB(writer.email, writer.name)}
        </span>
        <div>
          {recruitDate}
        </div>
      </div>
    </div>
  );
}

export default DetailHeaderSection;
