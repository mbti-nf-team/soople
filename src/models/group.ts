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

export interface WriteFieldsForm {
  name: string;
  value: string | string[];
}
