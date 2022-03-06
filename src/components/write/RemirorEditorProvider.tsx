import React, { PropsWithChildren, ReactElement } from 'react';

import { Remirror, useRemirror } from '@remirror/react';
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
  EmojiExtension,
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
import emojiData from 'svgmoji/emoji.json';

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
  new EmojiExtension({ data: emojiData, moji: 'twemoji' }),
  new HorizontalRuleExtension(),
  new CodeExtension(),
  new UnderlineExtension(),
];

function RemirorEditorProvider({ children }: PropsWithChildren<unknown>): ReactElement {
  const { manager, state, onChange } = useRemirror({
    extensions,
    content: '',
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
