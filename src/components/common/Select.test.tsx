import { UseFormRegisterReturn } from 'react-hook-form';

import { render, screen } from '@testing-library/react';

import Select from './Select';

describe('Select', () => {
  const register = {
    name: 'name',
  } as UseFormRegisterReturn;

  const handleChange = jest.fn();
  const options = {
    first: '1',
    second: '2',
  };

  const renderSelect = () => render((
    <Select
      register={register}
      id="id"
      onChange={handleChange}
      options={options}
      defaultOption={given.defaultOption}
      isDirect={given.isDirect}
    />
  ));

  context('defaultOption이 존재하는 경우', () => {
    given('defaultOption', () => 'default');

    it('default select option이 보여야만 한다', () => {
      const { container } = renderSelect();

      expect(container).toHaveTextContent('default');
    });
  });

  context('직접 입력 상태인 경우', () => {
    given('isDirect', () => true);

    it('select의 display 속성은 none이 되어야만 한다', () => {
      renderSelect();

      expect(screen.getByTestId('select')).toHaveStyle({
        display: 'none',
      });
    });
  });

  context('직접 입력 상태가 아닌 경우', () => {
    given('isDirect', () => false);

    it('select의 display 속성은 initial이 되어야만 한다', () => {
      renderSelect();

      expect(screen.getByTestId('select')).toHaveStyle({
        display: 'initial',
      });
    });
  });
});
