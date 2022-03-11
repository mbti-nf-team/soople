import { fireEvent, render, screen } from '@testing-library/react';

import WriteEditor from './WriteEditor';

jest.mock('@remirror/react');

describe('WriteEditor', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderWriteEditor = () => render((
    <WriteEditor />
  ));

  it('에디터에 대한 내용이 보여야만 한다', () => {
    renderWriteEditor();

    expect(screen.getByTestId('h1-button')).toBeInTheDocument();
  });

  describe('경고 메시지의 닫기 아이콘을 클릭한다', () => {
    it('경고 메시지가 안보여야만 한다', () => {
      const { container } = renderWriteEditor();

      expect(container).toHaveTextContent('글 내용에 오픈 채팅방 또는 메신저 URL이 포함되지 않았는지 확인해주세요.');

      fireEvent.click(screen.getByTestId('close-icon'));

      expect(container).not.toHaveTextContent('글 내용에 오픈 채팅방 또는 메신저 URL이 포함되지 않았는지 확인해주세요.');
    });
  });
});
