import { useCallback } from 'react';

import {
  EditorComponent, Remirror, useActive, useChainedCommands, useHelpers, useKeymap, useRemirror,
} from '@remirror/react';
import { htmlToProsemirrorNode } from 'remirror';
import {
  BoldExtension, DropCursorExtension, ImageExtension,
  ItalicExtension,
} from 'remirror/extensions';

import 'remirror/styles/all.css';

export const Menu = () => {
  const chain = useChainedCommands();
  const active = useActive();

  return (
    <button
      type="button"
      onClick={() => {
        chain
          .toggleBold()
          .focus()
          .run();
      }}
      style={{ fontWeight: active.bold() ? 'bold' : undefined }}
    >
      B
    </button>
  );
};

const hooks = [
  () => {
    const { getHTML, getJSON } = useHelpers();

    const handleSaveShortcut = useCallback(
      ({ state }) => {
        console.log(state);
        console.log(`Save to backend: ${JSON.stringify(getHTML(state))}`);
        console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

        return true; // Prevents any further key handlers from being run.
      },
      [getHTML],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },
];

function EditorPage() {
  const { manager, state, onChange } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new ImageExtension({ enableResizing: true }),
      new DropCursorExtension({ color: '#7963d2' }),
    ],
    content: '<p>awdawdawda</p><p>wdawdawd</p><p>awdawd</p><p></p>',
    selection: 'start',
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <div className="remirror-theme">
      <Remirror
        manager={manager}
        initialContent={state}
        hooks={hooks}
        onChange={onChange}
        suppressHydrationWarning
        placeholder="내용을 입력해주세요"
      >
        <Menu />
        <EditorComponent />
      </Remirror>
    </div>
  );
}
export default EditorPage;
