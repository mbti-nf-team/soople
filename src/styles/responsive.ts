import facepaint from 'facepaint';

const mq = facepaint([
  '@media(min-width: 450px)',
  '@media(min-width: 650px)',
  '@media(min-width: 1100px)',
]);

export const mq2 = facepaint([
  '@media(min-width: 450px)',
  '@media(min-width: 650px)',
  '@media(min-width: 850px)',
  '@media(min-width: 1100px)',
]);

export default mq;
