import { Profile } from './auth';

export type Category = 'study' | 'project';
export type RecruitmentEndSetting = 'manual' | 'automatic';

export interface WriteFields {
  title: string;
  content: string;
  tags: string[];
  category: Category | string;
  recruitmentEndSetting: RecruitmentEndSetting;
  recruitmentEndDate: string | null;
}

export interface CommentFields {
  groupId?: string;
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
