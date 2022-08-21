import { css, Theme } from '@emotion/react';

const styledAnchor = ({ theme }: { theme: Theme }) => css`
  a {
    color: ${theme.success10};
    transition: color 0.1s ease-in-out;
  
    &:hover {
      color: ${theme.success};
      text-decoration: underline;
    }
  }
`;

export default styledAnchor;
