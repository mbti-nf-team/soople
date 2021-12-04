import { render, screen } from '@testing-library/react';

import NewWriteForm from './NewWriteForm';

describe('NewWriteForm', () => {
  const renderNewWriteForm = () => render((
    <NewWriteForm />
  ));

  const placeholderTexts = [
    '제목을 입력하세요',
    '내용을 입력하세요',
  ];

  it('팀 모집하기 작성 폼에 대한 인풋 창이 나타나야만 한다', () => {
    renderNewWriteForm();

    placeholderTexts.forEach((placeholderText) => {
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });
  });
});
