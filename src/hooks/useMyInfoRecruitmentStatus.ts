/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { Group, RecruitmentStatus } from '@/models/group';

const useMyInfoRecruitmentStatus = (group: Group, recruitmentStatus: RecruitmentStatus) => {
  const [myInfoRecruitmentStatus, setMyInfoRecruitmentStatus] = useState();
};

export default useMyInfoRecruitmentStatus;
