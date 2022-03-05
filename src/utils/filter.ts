import sanitizeHtml from 'sanitize-html';

export const filteredWithSanitizeHtml = (dirtyHtml: string) => sanitizeHtml(dirtyHtml, {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'dd', 'div', 'dl', 'dt',
    'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre',
    'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn',
    'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp',
    'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'caption',
    'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'strike',
    'img', 'del', 'input',
  ],
  disallowedTagsMode: 'discard',
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel', 'data-link-auto'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    '*': ['class', 'id', 'aria-hidden'],
    pre: ['spellcheck'],
    code: ['data-code-block-language'],
    input: ['type'],
  },
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false,
});

export const removeAllHtml = (content: string) => sanitizeHtml(content, {
  allowedTags: [],
  allowedAttributes: {},
});
