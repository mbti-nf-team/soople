export interface WriteFields {
  title: string;
  contents: string;
  tags: string[];
}

export interface WriteFrom {
  title: string;
  contents: string;
}

export interface WriteFieldsForm {
  name: string;
  value: string | string[];
}
