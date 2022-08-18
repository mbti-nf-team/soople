import React, { PropsWithChildren, ReactElement } from 'react';

import { Remirror, useRemirror } from '@remirror/react';
import { useRecoilValue } from 'recoil';
import css from 'refractor/lang/css';
import java from 'refractor/lang/java';
import javascript from 'refractor/lang/javascript';
import json from 'refractor/lang/json';
import markdown from 'refractor/lang/markdown';
import typescript from 'refractor/lang/typescript';
import { htmlToProsemirrorNode } from 'remirror';
import {
  AnnotationExtension,
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  DropCursorExtension,
  HeadingExtension,
  HorizontalRuleExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  OrderedListExtension,
  StrikeExtension,
  UnderlineExtension,
  WhitespaceExtension,
} from 'remirror/extensions';

import { writeFieldsState } from '@/recoil/group/atom';
import palette from '@/styles/palette';

const extensions = () => [
  new LinkExtension({
    autoLink: true,
  }),
  new AnnotationExtension(),
  new WhitespaceExtension(),
  new StrikeExtension(),
  new HeadingExtension(),
  new BoldExtension(),
  new ItalicExtension(),
  new ImageExtension({ enableResizing: true }),
  new DropCursorExtension({ color: palette.success }),
  new BlockquoteExtension(),
  new BulletListExtension(),
  new OrderedListExtension(),
  new CodeBlockExtension({
    supportedLanguages: [css, javascript, json, markdown, typescript, java],
    syntaxTheme: 'dracula',
  }),
  new HorizontalRuleExtension(),
  new CodeExtension(),
  new UnderlineExtension(),
];

function RemirorEditorProvider({ children }: PropsWithChildren<unknown>): ReactElement {
  const writeFields = useRecoilValue(writeFieldsState);

  const { manager, state, onChange } = useRemirror({
    extensions,
    content: writeFields.content,
    selection: 'start',
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <Remirror
      manager={manager}
      initialContent={state}
      onChange={onChange}
      suppressHydrationWarning
      placeholder="내용을 입력해주세요"
    >
      {children}
    </Remirror>
  );
}

export default RemirorEditorProvider;
