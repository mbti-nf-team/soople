import { Applicant } from '@/models/group';

import PROFILE_FIXTURE from './profile';

const applicants: Applicant = {
  uid: '2',
  groupId: '1',
  introduce: 'introduce',
  portfolioUrl: 'https://test.test',
  isConfirm: false,
  applicant: PROFILE_FIXTURE,
  createdAt: '2021-11-11',
};

export default applicants;
