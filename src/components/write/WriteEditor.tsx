import React, { ReactElement } from 'react';

import { EditorComponent } from '@remirror/react';

import EditorToolbar from '@/components/write/EditorToolbar';

import 'remirror/styles/all.css';

function WriteEditor(): ReactElement {
  return (
    <div className="remirror-theme">
      <EditorToolbar />
      <EditorComponent />
    </div>
  );
}

export default WriteEditor;
