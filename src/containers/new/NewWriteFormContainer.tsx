import React, { ReactElement } from 'react';

import { useSession } from 'next-auth/client';

import NewWriteForm from '@/components/new/NewWriteForm';

function NewWriteFormContainer(): ReactElement {
  const [session, loading] = useSession();

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!session) {
    return <div>로그인 후 이용해주세요!</div>;
  }

  return (
    <NewWriteForm />
  );
}

export default NewWriteFormContainer;
