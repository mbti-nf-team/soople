import React, { ReactElement } from 'react';

import dayjs from 'dayjs';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Profile } from '@/models/auth';
import { Group } from '@/models/group';

import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  group: Group;
  writer: Profile;
  currentTime: number;
}

function DetailHeaderSection({ group, writer, currentTime }: Props): ReactElement {
  const recruitDate = useRecruitDateStatus(group, currentTime);

  const { image, name, email } = writer;

  return (
    <div>
      <h1>{group.title}</h1>
      <div>
        {image ? (
          <img src={image} alt="writer-img" width="50px" height="50px" />
        ) : (
          <div>이미지 없음</div>
        )}
        <span>
          {name || email}
        </span>
        <div>
          {recruitDate}
        </div>
      </div>
    </div>
  );
}

export default DetailHeaderSection;
