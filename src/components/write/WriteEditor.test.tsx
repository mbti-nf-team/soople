import { render, screen } from '@testing-library/react';

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
});
