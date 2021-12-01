import { Session } from 'next-auth';

const session: Session = {
  user: {
    uid: '1',
    name: 'test',
    email: 'test@test.com',
    image: 'http://image.com',
  },
};

export default session;
