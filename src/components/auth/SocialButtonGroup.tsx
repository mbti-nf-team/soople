import React, { ReactElement } from 'react';

import { signIn } from 'next-auth/client';

function SocialButtonGroup(): ReactElement {
  return (
    <div>
      <button type="button" onClick={() => signIn('google')}>
        구글 로그인
      </button>
      <button type="button" onClick={() => signIn('github')}>
        깃허브 로그인
      </button>
      <button type="button" onClick={() => signIn('kakao')}>
        카카오 로그인
      </button>
    </div>
  );
}

export default SocialButtonGroup;
