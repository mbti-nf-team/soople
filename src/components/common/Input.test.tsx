import { fireEvent, render, screen } from '@testing-library/react';

import { lightTheme } from '@/styles/theme';
import MockTheme from '@/test/MockTheme';

import Input from './Input';

describe('Input', () => {
  const handleClear = jest.fn();

  const renderInput = () => render((
    <MockTheme>
      <Input
        id="test"
        labelOptionText="labelOptionText"
        labelText="test"
        placeholder="test"
        onClear={handleClear}
        isError={given.isError}
        message="message"
        disabled={given.disabled}
        defaultValue={given.defaultValue}
      />
    </MockTheme>
  ));

  it('input 값이 변한다', () => {
    renderInput();

    const input = screen.getByPlaceholderText('test');

    fireEvent.input(input, {
      target: { value: 'Text' },
    });

    expect(input).toHaveValue('Text');
  });

  describe('error의 유무에 따라 스타일이 변경된다', () => {
    context('isError가 true인 경우', () => {
      given('isError', () => true);

      it(`input의 border color가 ${lightTheme.warning}이어야만 한다`, () => {
        renderInput();

        expect(screen.getByPlaceholderText('test')).toHaveStyle({
          border: `1px solid ${lightTheme.warning}`,
        });
      });
    });

    context('isError가 false인 경우', () => {
      given('isError', () => false);

      it(`input의 border color가 ${lightTheme.accent2}이어야만 한다`, () => {
        renderInput();

        expect(screen.getByPlaceholderText('test')).toHaveStyle({
          border: `1px solid ${lightTheme.accent2}`,
        });
      });
    });
  });

  describe('clear icon의 속성이 달라진다', () => {
    context('input의 값이 존재하지 않거나 disabled이거나 readOnly인 경우', () => {
      it('display 속성이 none이어야만 한다', () => {
        renderInput();

        expect(screen.getByTestId('clear-icon')).toHaveAttribute('display', 'none');
      });
    });

    context('input의 값이 존재하고 disabled이 아니거나 readOnly가 아닌 경우', () => {
      given('disabled', () => false);
      given('defaultValue', () => 'Test');

      it('display 속성이 block이어야만 한다', () => {
        renderInput();

        expect(screen.getByTestId('clear-icon')).toHaveAttribute('display', 'block');
      });

      describe('clear 아이콘을 클릭한다', () => {
        it('클릭 이벤트가 호출되어야만 한다', () => {
          renderInput();

          fireEvent.click(screen.getByTestId('clear-icon'));

          expect(handleClear).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
