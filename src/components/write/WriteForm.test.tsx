import { fireEvent, render, screen } from '@testing-library/react';

import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import WriteForm from './WriteForm';

describe('WriteForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderWriteForm = () => render((
    <WriteForm
      fields={WRITE_FIELDS_FIXTURE}
      onChange={handleChange}
    />
  ));

  const placeholderTexts = [
    '제목을 입력하세요',
    '내용을 입력하세요',
  ];

  it('팀 모집하기 작성 폼에 대한 인풋 창이 나타나야만 한다', () => {
    renderWriteForm();

    placeholderTexts.forEach((placeholderText) => {
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });
  });

  describe('인풋 창에 입력한다', () => {
    const inputValue = {
      name: 'title',
      value: 'test',
    };

    it('onChange 이벤트가 호출되야만 한다', () => {
      renderWriteForm();

      fireEvent.change(screen.getByPlaceholderText('제목을 입력하세요'), { target: inputValue });

      expect(handleChange).toBeCalledWith(inputValue);
    });
  });

  describe('태그를 입력한다', () => {
    it('changeFields 이벤트가 발생해야만 한다', () => {
      renderWriteForm();

      const input = screen.getByPlaceholderText('태그를 입력하세요');

      fireEvent.change(input, { target: { value: 'test' } });

      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

      expect(handleChange).toBeCalledWith({
        name: 'tags',
        value: ['test'],
      });
    });
  });
});
