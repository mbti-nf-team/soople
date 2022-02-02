import React, {
  ChangeEvent, ReactElement, useEffect, useState,
} from 'react';

import { KeyPair } from '@/models';
import { WriteFields } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

import Select from '../common/Select';

interface Props {
  fields: WriteFields;
  onChangeFields: (form: KeyPair<WriteFields>) => void;
}

function PublishModalForm({ fields, onChangeFields }: Props): ReactElement {
  const [isEndDateDisabled, setEndDateDisabled] = useState<boolean>(false);
  const { category, recruitmentEndSetting, recruitmentEndDate } = fields;

  const handleChangeFields = (e: ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    const { value, name } = e.target;

    onChangeFields({ [name]: value });
  };

  useEffect(() => {
    if (recruitmentEndSetting === 'manual') {
      setEndDateDisabled(true);
      onChangeFields({ recruitmentEndDate: '' });
      return;
    }

    setEndDateDisabled(false);
  }, [recruitmentEndSetting]);

  return (
    <div>
      <div>
        <label htmlFor="category">
          분류
          <Select
            id="category"
            value={category}
            isDirect={false}
            onChange={handleChangeFields}
            defaultOption="분류를 선택해주세요."
            options={{
              study: '스터디',
              project: '프로젝트',
            }}
          />
        </label>
      </div>

      <div>
        <label htmlFor="recruitmentEndSetting">
          모집 종료 설정
          <Select
            id="recruitmentEndSetting"
            value={recruitmentEndSetting}
            isDirect={false}
            onChange={handleChangeFields}
            options={{
              automatic: '입력한 시간에 자동으로 종료',
              manual: '수동으로 종료',
            }}
          />
        </label>
      </div>

      <div>
        <label htmlFor="recruitmentEndDate">
          모집 종료일시
          <input
            id="recruitmentEndDate"
            name="recruitmentEndDate"
            type="datetime-local"
            onChange={handleChangeFields}
            value={stringToExcludeNull(recruitmentEndDate)}
            disabled={isEndDateDisabled}
          />
        </label>
      </div>
    </div>
  );
}

export default PublishModalForm;
