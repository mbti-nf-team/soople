/* eslint-disable no-param-reassign */
// NOTE - Custom from https://github.com/mapbox/rehype-prism
import { toString } from 'hast-util-to-string';
import { refractor } from 'refractor';
import { visit } from 'unist-util-visit';

function rehypePrism(options) {
  options = options || {};

  if (options?.alias) {
    refractor.alias(options?.alias);
  }

  function visitor(node, index, parent) {
    if (!parent || parent?.tagName !== 'pre' || node?.tagName !== 'code') {
      return;
    }

    const lang = node?.properties?.dataCodeBlockLanguage || null;

    if (lang === null) {
      return;
    }

    let result;

    try {
      result = refractor.highlight(toString(node), lang);
    } catch (err) {
      if (options?.ignoreMissing && /Unknown language/.test(err?.message)) {
        return;
      }
      throw err;
    }

    node.children = result?.children;
  }

  return (tree) => visit(tree, 'element', visitor);
}

export default rehypePrism;
