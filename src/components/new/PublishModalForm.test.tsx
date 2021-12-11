import { fireEvent, render, screen } from '@testing-library/react';

import { WriteFields } from '@/models/group';

import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalForm from './PublishModalForm';

describe('PublishModalForm', () => {
  const handleChangeFields = jest.fn();

  const renderPublishModalForm = (fields: WriteFields) => render((
    <PublishModalForm
      fields={fields}
      onChangeFields={handleChangeFields}
    />
  ));

  it('등록하기 폼 항목이 나타나야만 한다', () => {
    const labels = ['분류', '모집인원', '모집 종료 설정', '모집 종료일시'];

    renderPublishModalForm(WRITE_FIELDS_FIXTURE);

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeNull();
    });
  });

  describe('분류를 선택한다', () => {
    it('changeFields 이벤트가 발생해야만 한다', () => {
      renderPublishModalForm(WRITE_FIELDS_FIXTURE);

      fireEvent.change(screen.getByDisplayValue('분류를 선택해주세요.'), {
        target: { value: 'study' },
      });

      expect(handleChangeFields).toBeCalledWith({
        name: 'category',
        value: 'study',
      });
    });
  });

  describe('태그를 입력한다', () => {
    it('changeFields 이벤트가 발생해야만 한다', () => {
      renderPublishModalForm(WRITE_FIELDS_FIXTURE);

      const input = screen.getByPlaceholderText('태그를 입력하세요');

      fireEvent.change(input, { target: { value: 'test' } });

      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

      expect(handleChangeFields).toBeCalledWith({
        name: 'tags',
        value: ['test'],
      });
    });
  });
});
