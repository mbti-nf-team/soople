import { PropsWithChildren, useEffect } from 'react';

import { RecoilState, useRecoilValue } from 'recoil';

interface Props<T> {
  node: RecoilState<T>;
  onChange: jest.Mock;
}

function RecoilObserver<T>({ node, onChange }: PropsWithChildren<Props<T>>): null {
  const value = useRecoilValue(node);

  useEffect(() => onChange(value), [onChange, value]);

  return null;
}

export default RecoilObserver;
