import { css } from '@emotion/react';

import palette from './palette';

const styledAnchor = css`
  a {
    color: ${palette.success10};
    transition: color 0.1s ease-in-out;
  
    &:hover {
      color: ${palette.success};
      text-decoration: underline;
    }
  }
`;

export default styledAnchor;
