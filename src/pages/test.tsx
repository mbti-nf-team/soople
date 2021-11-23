import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '@/reducers/store';

function Test(): ReactElement {
  const { auth } = useSelector((state: AppState) => state.authReducer);

  return (
    <div>
      {auth}
    </div>
  );
}

export default Test;
