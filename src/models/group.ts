export type Category = 'study' | 'project';
export type RecruitmentEndSetting = 'manual' | 'automatic';

export interface WriteFields {
  title: string;
  contents: string;
  tags: string[];
  category: Category | string;
  recruitmentNumber: number | string;
  recruitmentEndSetting: RecruitmentEndSetting;
  recruitmentEndDate: string | null;
}

export interface Group {
  groupId: string;
  title: string;
  contents: string;
  tags: string[];
  category: Category | string;
  recruitmentNumber: number;
  recruitmentEndSetting: RecruitmentEndSetting;
  recruitmentEndDate: string | null;
  writer: string;
  createAt: string;
}

export interface WriteFieldsForm {
  name: string;
  value: string | string[];
}
