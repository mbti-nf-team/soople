import { render } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import MyGroups from './MyGroups';

describe('MyGroups', () => {
  const handleClick = jest.fn();

  const MockComponent = () => <>Component</>;

  const renderMyGroups = () => render((
    <MyGroups
      onClickGroup={handleClick}
      groups={given.groups}
    >
      <MockComponent />
    </MyGroups>
  ));

  context('group이 존재하지 않는 경우', () => {
    given('groups', () => []);

    it('자식 컴포넌트가 나타나야만 한다', () => {
      const { container } = renderMyGroups();

      expect(container).toHaveTextContent('Component');
    });
  });

  context('group이 존재하는 경우', () => {
    given('groups', () => [FIXTURE_GROUP]);

    it('팀에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderMyGroups();

      expect(container).toHaveTextContent(FIXTURE_GROUP.title);
    });
  });
});
