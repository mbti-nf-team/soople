import { render } from '@testing-library/react';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import SettingForm from './SettingForm';

describe('SettingForm', () => {
  const renderSettingForm = () => render((
    <SettingForm
      user={{
        ...FIXTURE_PROFILE,
        position: given.position,
      }}
    />
  ));

  context('포지션이 존재하지 않는 경우', () => {
    given('position', () => null);

    it('"포지션을 입력 또는 선택해주세요."가 나타나야만 한다', () => {
      const { container } = renderSettingForm();

      expect(container).toHaveTextContent('포지션을 입력 또는 선택해주세요.');
    });
  });

  context('포지션이 존재하는 경우', () => {
    given('position', () => '프론트엔드');

    it('포지션이 나타나야만 한다', () => {
      const { container } = renderSettingForm();

      expect(container).toHaveTextContent('프론트엔드');
    });
  });
});
