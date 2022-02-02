import { Profile } from './auth';

export type Category = 'study' | 'project';
export type RecruitmentEndSetting = 'manual' | 'automatic';

export const initialWriteFieldsState: WriteFields = {
  title: '',
  content: '',
  tags: [],
  category: '',
  recruitmentEndDate: '',
  recruitmentEndSetting: 'automatic',
};

export interface WriteFields {
  title: string;
  content: string;
  tags: string[];
  category: Category | string;
  recruitmentEndSetting: RecruitmentEndSetting;
  recruitmentEndDate: string | null;
}

export interface FilterGroupsCondition {
  category: Category[];
  isFilterCompleted: boolean;
}

export interface CommentFields {
  groupId?: string;
  content: string;
  writer: Profile;
}

export interface CommentForm {
  groupId: string;
  content: string;
  writer: Profile;
}

export interface Comment {
  commentId: string;
  groupId: string;
  content: string;
  writer: Profile;
  createdAt: string;
}

export interface Group {
  groupId: string;
  title: string;
  content: string;
  tags: string[];
  category: Category | string;
  recruitmentEndSetting: RecruitmentEndSetting;
  recruitmentEndDate: string | null;
  isCompleted: boolean;
  views: number;
  numberApplicants: number;
  writer: Profile;
  createdAt: string;
}

export interface WriteFieldsForm {
  name: string;
  value: string | string[];
}

export interface TagCount {
  name: string;
  count: number;
}

export interface Applicant {
  uid: string;
  groupId: string;
  introduce: string;
  portfolioUrl: string | null;
  isConfirm: boolean;
  applicant: Profile;
  createdAt: string;
}

export interface ApplicantFields {
  groupId: string;
  introduce: string;
  portfolioUrl: string | null;
  applicant: Profile;
}

export interface ApplicantForm {
  portfolioUrl: string | null;
  introduce: string;
}
