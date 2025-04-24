import markdownit from 'markdown-it';
import type { Options, Renderer, Token } from 'markdown-it';
// @ts-ignore
import imageFigures from 'markdown-it-image-figures';
import { HTMLElement, NodeType, parse } from 'node-html-parser';

const parseHtmlBlockPlugin = (md: markdownit, level = 0) => {
  function parseHtmlBlock(tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) {
    function addLineNumbersToHtml(rootElement: HTMLElement, mdParser: markdownit, startLine: number, level: number = 0) {
      let currentLine = startLine;
      let content = '';
      for (const element of rootElement.childNodes) {
        if (element.nodeType === NodeType.ELEMENT_NODE) {
          console.log("ELEMENT", element, currentLine);
          (element as HTMLElement).setAttribute('data-source-line', String(currentLine));
          const resAddLine = addLineNumbersToHtml(element as HTMLElement, mdParser, currentLine, level + 1);
          content += element.toString();
          currentLine = resAddLine.currentLine;
        } else if (element.nodeType === NodeType.TEXT_NODE) {
          if (level === 0) {
            console.log("TEXT_LVL0", element.rawText, currentLine);
            const { content: content2, currentLine: line } = addLineNumbersToHtml(
              parse(mdParser.render(element.rawText)),
              mdParser,
              currentLine,
              level + 1,
            );
            content += '\n' + content2 + '\n';
            currentLine = line;
          } else {
            console.log("TEXT_LVL1", element.rawText.replace('\n', 'n'), currentLine);
            const nbLineBreaks = (element.rawText.match(/\n/g) || []).length;
            content += element.toString();
            currentLine += nbLineBreaks;
          }
        } 
      }
      return { content, currentLine };
    }
    const parser = build_parser(level + 1);
    const rootHtmlElement = parse(parser.render('\n' + tokens[idx].content + '\n'));
    const { content } = addLineNumbersToHtml(rootHtmlElement, parser, env.startLine, 0);
    console.log("CONTENT", content);
    return content;
  }
  md.renderer.rules.html_block = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    const newEnv = tokens[idx].map ? { ...env, startLine: tokens[idx].map[0], endLine: tokens[idx].map[1] } : env;
    return parseHtmlBlock(tokens, idx, options, newEnv, slf);
  };
  md.renderer.rules.html_inline = (tokens: Token[], idx: number, options: Options, env: any, slf: Renderer) => {
    const newEnv = tokens[idx].map ? { ...env, startLine: tokens[idx].map[0], endLine: tokens[idx].map[1] } : env;
    return parseHtmlBlock(tokens, idx, options, newEnv, slf);
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
  md.renderer.rules.hr = _addLineNumbers;
  md.renderer.rules.link_open = _addLineNumbers;
  md.renderer.rules.list_item_open = _addLineNumbers;
  md.renderer.rules.ordered_list_open = _addLineNumbers;
  md.renderer.rules.paragraph_open = _addLineNumbers;
  md.renderer.rules.table_open = _addLineNumbers;
  md.renderer.rules.td_open = _addLineNumbers;
  md.renderer.rules.th_open = _addLineNumbers;
  md.renderer.rules.tr_open = _addLineNumbers;
  // TODO: md.renderer.rules.fence = _addLineNumbers;
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
