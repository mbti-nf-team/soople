import { render } from '@testing-library/react';

import Home from './index.page';

describe('index', () => {
  const renderIndex = () => render(<Home />);

  it('Render Home Contents', () => {
    const { container } = renderIndex();

    expect(container).toHaveTextContent('Get started by editing');
  });
});
