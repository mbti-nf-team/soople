import React, { ReactElement } from 'react';

import { useActive, useChainedCommands } from '@remirror/react';

function EditorToolbar(): ReactElement {
  const chain = useChainedCommands();
  const active = useActive();

  const handleClick = () => chain
    .toggleBold()
    .focus()
    .run();

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ fontWeight: active.bold() ? 'bold' : undefined }}
    >
      B
    </button>
  );
}
export default EditorToolbar;
