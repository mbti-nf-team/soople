import facepaint from 'facepaint';

const breakpoints = ['450', '650', '850', '1100'];

export const mediaQueries = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const mobileMediaQuery = '@media (max-width: 450px)';

const mq = facepaint([
  mediaQueries[0],
  mediaQueries[1],
  mediaQueries[3],
]);

export const mq2 = facepaint([
  ...mediaQueries,
]);

export const breakpoint = {
  mobile: 450,
  tablet: 650,
};

export default mq;
