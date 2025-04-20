import markdownit, { Options, Renderer, Token } from 'markdown-it';
// @ts-ignore
import imageFigures from 'markdown-it-image-figures';
import { parse } from 'node-html-parser';

const parseHtmlBlockPlugin = (md: markdownit, level = 0) => {
  function parseHtmlBlock(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) {
    const parser = build_parser(level + 1);
    console.log(parser.render('\n' + tokens[idx].content.replace(/\n/g, '\n\n') + '\n'));
    const x = parse(parser.render('\n' + tokens[idx].content.replace(/\n/g, '\n\n') + '\n'));
    console.log(x.range);
    return parser.render('\n' + tokens[idx].content.replace(/\n/g, '\n\n') + '\n');
  }
  md.renderer.rules.html_block = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    return parseHtmlBlock(tokens, idx, options, env, slf);
  };
  md.renderer.rules.html_inline = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    return parseHtmlBlock(tokens, idx, options, env, slf);
  };
};

const addLineNumbers = (md: markdownit, level = 0) => {
  function _addLineNumbers(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) {
    if (tokens[idx].map) {
      const line = level === 0 ? tokens[idx].map[0] : (tokens[idx].map[0] - 1) / 2 + 3;
      tokens[idx].attrSet('data-source-line', String(line));
    }
    return slf.renderToken(tokens, idx, options);
  }
  md.renderer.rules.blockquote_open = _addLineNumbers;
  md.renderer.rules.bullet_list_open = _addLineNumbers;
  md.renderer.rules.heading_open = _addLineNumbers;
  md.renderer.rules.link_open = _addLineNumbers;
  md.renderer.rules.list_item_open = _addLineNumbers;
  md.renderer.rules.ordered_list_open = _addLineNumbers;
  md.renderer.rules.paragraph_open = _addLineNumbers;
  md.renderer.rules.table_open = _addLineNumbers;
  md.renderer.rules.td_open = _addLineNumbers;
  md.renderer.rules.th_open = _addLineNumbers;
  md.renderer.rules.tr_open = _addLineNumbers;
};

const build_parser = (level = 0) => {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  });
  md.use(imageFigures);
  md.use((md) => addLineNumbers(md, level));
  return md;
};

export const addLineNumbersPlugin = (md: markdownit) => {
  md.use(addLineNumbers);
  md.use(parseHtmlBlockPlugin);
};
