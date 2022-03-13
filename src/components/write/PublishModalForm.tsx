import React, {
  ChangeEvent, FormEvent, ReactElement, useEffect, useState,
} from 'react';

import styled from '@emotion/styled';

import { KeyPair, SelectOption } from '@/models';
import {
  Category, RecruitmentEndSetting, WriteFields,
} from '@/models/group';
import { subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import { stringToExcludeNull } from '@/utils/utils';

import FormModal from '../common/FormModal';
import Input from '../common/Input';
import SelectBox from '../common/SelectBox';
import Textarea from '../common/Textarea';

import ThumbnailUpload from './ThumbnailUpload';

interface Props {
  fields: WriteFields;
  onChangeFields: (form: KeyPair<WriteFields>) => void;
  onSubmit: () => void;
  isVisible: boolean;
  isRecruiting: boolean;
  isEdit: boolean;
  onClose: () => void;
}

const categoryOption: SelectOption<Category>[] = [
  { label: '스터디', value: 'study' },
  { label: '프로젝트', value: 'project' },
];

const recruitmentEndSettingOption: SelectOption<RecruitmentEndSetting>[] = [
  { label: '입력한 시간에 자동으로 종료', value: 'automatic' },
  { label: '수동으로 마감', value: 'manual' },
];

function PublishModalForm({
  fields, onChangeFields, onSubmit, onClose, isVisible, isEdit, isRecruiting,
}: Props): ReactElement {
  const [isEndDateDisabled, setEndDateDisabled] = useState<boolean>(false);
  const [defaultCategory, setDefaultCategory] = useState<SelectOption<Category>>();
  const {
    recruitmentEndSetting, recruitmentEndDate, title, shortDescription, category,
  } = fields;

  const defaultRecruitmentEndSetting = recruitmentEndSettingOption.find(({
    value,
  }) => value === recruitmentEndSetting);

  const handleChangeFields = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    if (name === 'shortDescription') {
      onChangeFields({ [name]: value.slice(0, 100) });
      return;
    }

    onChangeFields({ [name]: value });
  };

  const handleCategoryChange = (selectedCategory: Category) => onChangeFields({
    category: selectedCategory,
  });

  const handleSettingChange = (selectedSetting: RecruitmentEndSetting) => onChangeFields({
    recruitmentEndSetting: selectedSetting,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    if (recruitmentEndSetting === 'manual') {
      setEndDateDisabled(true);
      onChangeFields({ recruitmentEndDate: '' });
      return;
    }

    setEndDateDisabled(false);
  }, [recruitmentEndSetting]);

  useEffect(() => {
    if (category) {
      const initialCategory = categoryOption.find(({ value }) => value === category);

      setDefaultCategory(initialCategory);
    }
  }, [category]);

  return (
    <FormModal
      isVisible={isVisible}
      onClose={onClose}
      title={`${title} ${isEdit ? '수정' : '등록'}`}
      onSubmit={handleSubmit}
      confirmText={`${isEdit ? '저장' : '등록'}하기`}
    >
      <PublishModalFormWrapper>
        <DescriptionWrapper>
          <ThumbnailUpload />

          <Textarea
            id="shortDescription"
            name="shortDescription"
            placeholder="짧은 소개글을 입력하세요"
            labelText="소개글"
            height="128px"
            onChange={handleChangeFields}
            value={shortDescription}
            isError={shortDescription.length === 100}
          />
          <ShortDescriptionLength isError={shortDescription.length === 100} data-testid="short-description-length">
            {`${shortDescription.length} / 100`}
          </ShortDescriptionLength>
        </DescriptionWrapper>

        <PublishFormWrapper>
          <SelectBox
            id="category"
            labelText="분류"
            placeholder="분류를 선택해주세요."
            options={categoryOption}
            defaultValue={defaultCategory}
            onChange={handleCategoryChange}
            disabled={!isRecruiting}
          />

          <SelectBox
            id="recruitmentEndSetting"
            labelText="모집 종료 설정"
            placeholder="모집 종료 설정을 선택해주세요"
            options={recruitmentEndSettingOption}
            defaultValue={defaultRecruitmentEndSetting}
            onChange={handleSettingChange}
            disabled={!isRecruiting}
          />

          <RecruitmentEndDateInput
            id="recruitmentEndDate"
            name="recruitmentEndDate"
            labelText="모집 마감일시"
            placeholder="모집 마감일시를 입력하세요"
            type="datetime-local"
            onChange={handleChangeFields}
            value={stringToExcludeNull(recruitmentEndDate)}
            disabled={isEndDateDisabled || !isRecruiting}
          />
        </PublishFormWrapper>
      </PublishModalFormWrapper>
    </FormModal>
  );
}

export default PublishModalForm;

const PublishModalFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-column-gap: 20px;
  padding: 0px 24px 40px 24px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecruitmentEndDateInput = styled(Input)`
  position: relative;
  padding: 11px 7px 11px 16px;

  &:focus-within {
    border: 1px solid ${palette.success};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    position: absolute;
    right: 14px;
  }
`;

const PublishFormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(div:last-of-type) {
    margin-bottom: 20px;
  }
`;

const ShortDescriptionLength = styled.div<{ isError: boolean; }>`
  ${subtitle1Font()}
  color: ${({ isError }) => (isError ? palette.warning : palette.accent5)};
  text-align: right;
  margin-top: 6px;
`;
