/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from '@testing-library/react';

import { SelectOption } from '@/models';
import { Position } from '@/models/group';

import CreatableSelectBox from './CreatableSelectBox';

const positionOption: SelectOption<Position>[] = [
  { label: '프론트엔드', value: '프론트엔드' },
  { label: '백엔드', value: '백엔드' },
  { label: '학생', value: '학생' },
  { label: '디자인', value: '디자인' },
];

describe('SelectBox', () => {
  const handleChange = jest.fn();
  const errorMessage = '입력을 안했어요';

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderSelectBox = () => render((
    <CreatableSelectBox
      id="position"
      options={positionOption}
      onChange={handleChange}
      labelText="포지션"
      placeholder="포지션을 선택하세요"
      errorMessage={errorMessage}
      size={given.size}
    />
  ));

  describe('select의 사이즈가 달라진다', () => {
    context('size가 large일 경우', () => {
      given('size', () => 'large');

      it('"height"가 "48px"이어야만 한다', () => {
        const { container } = renderSelectBox();

        const selectBoxElement = container.querySelector('.select__control');

        expect(selectBoxElement).toHaveStyle({
          height: '48px',
        });
      });
    });

    context('size가 medium일 경우', () => {
      given('size', () => 'medium');

      it('"height"가 "36px"이어야만 한다', () => {
        const { container } = renderSelectBox();

        const selectBoxElement = container.querySelector('.select__control');

        expect(selectBoxElement).toHaveStyle({
          height: '36px',
        });
      });
    });

    context('size가 small일 경우', () => {
      given('size', () => 'small');

      it('"width"가 "107px"이어야만 한다', () => {
        const { container } = renderSelectBox();

        const selectBoxElement = container.querySelector('.select__control');

        expect(selectBoxElement).toHaveStyle({
          width: '107px',
        });
      });
    });
  });

  context('select option을 선택한 경우', () => {
    describe('select option을 클릭한다', () => {
      it('change 이벤트가 발생해야만 한다', () => {
        renderSelectBox();

        const input = screen.getByRole('combobox');

        fireEvent.focus(input);
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
        fireEvent.click(screen.getByText(positionOption[1].value));

        expect(handleChange).toBeCalledWith(positionOption[1].value);
      });
    });
  });

  context('select option을 선택하지 않은 경우', () => {
    it('에러 메시지가 나타나야만 한다', () => {
      const { container } = renderSelectBox();

      const input = screen.getByRole('combobox');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 13 });
      fireEvent.keyDown(input, { key: 'Backspace', code: 8 });

      expect(container).toHaveTextContent(errorMessage);
    });
  });
});
