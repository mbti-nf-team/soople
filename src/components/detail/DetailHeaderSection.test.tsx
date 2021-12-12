import { render } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import DetailHeaderSection from './DetailHeaderSection';

describe('DetailHeaderSection', () => {
  const renderDetailHeaderSection = () => render((
    <DetailHeaderSection
      group={FIXTURE_GROUP}
    />
  ));

  it('글의 제목이 나타나야만 한다', () => {
    const { container } = renderDetailHeaderSection();

    expect(container).toHaveTextContent('title');
  });
});
