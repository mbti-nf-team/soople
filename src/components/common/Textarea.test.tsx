import { fireEvent, render, screen } from '@testing-library/react';

import { lightTheme } from '@/styles/theme';
import MockTheme from '@/test/MockTheme';

import Textarea from './Textarea';

describe('Textarea', () => {
  const handleChange = jest.fn();

  const renderTextarea = () => render((
    <MockTheme>
      <Textarea
        placeholder="test"
        value="test"
        isError={given.isError}
        labelText="test"
        onChange={handleChange}
      />
    </MockTheme>
  ));

  context('error가 존재하지 않는 경우', () => {
    given('isError', () => false);

    it(`textarea border 색상이 ${lightTheme.accent2}이어야만 한다`, () => {
      renderTextarea();

      expect(screen.getByPlaceholderText('test')).toHaveStyle({
        border: `1px solid ${lightTheme.accent2}`,
      });
    });

    it('change 이벤트가 호출되어야만 한다', () => {
      renderTextarea();

      fireEvent.change(screen.getByPlaceholderText('test'), {
        target: {
          value: '내용',
        },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('error가 존재한 경우', () => {
    given('isError', () => true);

    it(`textarea border 색상이 ${lightTheme.warning}이어야만 한다`, () => {
      renderTextarea();

      expect(screen.getByPlaceholderText('test')).toHaveStyle({
        border: `1px solid ${lightTheme.warning}`,
      });
    });
  });
});
