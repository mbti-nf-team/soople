import {
  ChangeEvent, FormEvent, ReactElement, useEffect, useState,
} from 'react';

import styled from '@emotion/styled';
import { removeNullable } from '@nf-team/core';

import { SelectOption } from '@/models';
import {
  Category, RecruitmentEndSetting, WriteFields,
} from '@/models/group';
import { subtitle1Font } from '@/styles/fontStyles';
import { mediaQueries, mobileMediaQuery } from '@/styles/responsive';

import FormModal from '../common/FormModal';
import Input from '../common/Input';
import SelectBox from '../common/SelectBox';
import Textarea from '../common/Textarea';

import ThumbnailUpload from './ThumbnailUpload';

interface Props {
  fields: WriteFields;
  onChangeFields: (form: Partial<WriteFields>) => void;
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

  const isErrorShortDescription = shortDescription.length > 100;
  const isValidWriteForm = !!category && !!title && !isErrorShortDescription && (recruitmentEndSetting === 'manual' || (recruitmentEndSetting === 'automatic' && !!recruitmentEndDate));

  const defaultRecruitmentEndSetting = recruitmentEndSettingOption.find(({
    value,
  }) => value === recruitmentEndSetting);

  const handleChangeFields = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;

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

    if (isValidWriteForm) {
      onSubmit();
    }
  };

  useEffect(() => {
    if (recruitmentEndSetting === 'manual') {
      setEndDateDisabled(true);
      onChangeFields({ recruitmentEndDate: '' });
      return;
    }

    setEndDateDisabled(false);
  }, [recruitmentEndSetting, onChangeFields]);

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
      title={(
        <>
          <span>{title}</span>
          &nbsp;
          <TitleBranch>{isEdit ? '수정' : '등록'}</TitleBranch>
        </>
      )}
      onSubmit={handleSubmit}
      confirmText={`${isEdit ? '저장' : '등록'}하기`}
      isDisabledConfirmButton={!isValidWriteForm}
    >
      <FormModalBox>
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
              isError={isErrorShortDescription}
            />
            <ShortDescriptionLength isError={isErrorShortDescription} data-testid="short-description-length">
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
              value={removeNullable(recruitmentEndDate)}
              disabled={isEndDateDisabled || !isRecruiting}
            />
          </PublishFormWrapper>
        </PublishModalFormWrapper>
      </FormModalBox>
    </FormModal>
  );
}

export default PublishModalForm;

const FormModalBox = styled.div`
  ${mobileMediaQuery} {
    overflow-y: auto;
    height: calc(100% - 120px);
  }
`;

const PublishModalFormWrapper = styled.div`
  ${mediaQueries[0]} {
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-column-gap: 20px;
    padding: 0px 24px 40px 24px;
  }

  margin-top: 16px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 0px 20px 40px 20px;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecruitmentEndDateInput = styled(Input)`
  padding: 11px 7px 11px 16px;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.success};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    position: absolute;
    right: 14px;
  }
`;

const TitleBranch = styled.strong`
  font-weight: inherit;
  white-space: nowrap;
`;

const PublishFormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 20px;
  }
`;

const ShortDescriptionLength = styled.div<{ isError: boolean; }>`
  ${subtitle1Font()}
  color: ${({ isError, theme }) => (isError ? theme.warning : theme.accent5)};
  text-align: right;
  margin-top: 6px;
`;
