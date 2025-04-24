import dedent from 'dedent';
import fs from 'node:fs';
import markdownit from 'markdown-it';
import { addLineNumbersPlugin } from '../src';

const parseMarkdown = (markdown: string) => {
  const md = markdownit({
    html: true,
    xhtmlOut: true,
  });
  md.use(addLineNumbersPlugin);
  return md.render(markdown);
};

describe('addLineNumbersPlugin', () => {
  describe('headings', () => {
    const markdown = fs.readFileSync('./tests/headings.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <h1 data-source-line="0">Heading level 1</h1>
      <h2 data-source-line="1">Heading level 2</h2>
      <h3 data-source-line="2">Heading level 3</h3>
      <h4 data-source-line="3">Heading level 4</h4>
      <h5 data-source-line="4">Heading level 5</h5>
      <h6 data-source-line="5">Heading level 6</h6>
      <h1 data-source-line="7">Heading level 1</h1>
      <h2 data-source-line="10">Heading level 2</h2>
    `) + '\n');
  });

  describe('paragraphs', () => {
    const markdown = fs.readFileSync('./tests/paragraphs.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <p data-source-line="0">I really like using Markdown.</p>
      <p data-source-line="2">I think I'll use it to format all of my documents from now on.</p>
      <p data-source-line="4">This is the first line.<br />
      And this is the second line.</p>
    `) + '\n');
  });

  describe('emphasis', () => {
    const markdown = fs.readFileSync('./tests/emphasis.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <p data-source-line="0">I just love <strong>bold text</strong>.
      I just love <strong>bold text</strong>.
      Love<strong>is</strong>bold
      Italicized text is the <em>cat's meow</em>.
      Italicized text is the <em>cat's meow</em>.
      A<em>cat</em>meow
      This text is <em><strong>really important</strong></em>.
      This text is <em><strong>really important</strong></em>.
      This text is <strong><em>really important</em></strong>.
      This text is <strong><em>really important</em></strong>.
      This is really<em><strong>very</strong></em>important text.</p>
    `) + '\n');
  });

  describe('blockquotes', () => {
    const markdown = fs.readFileSync('./tests/blockquotes.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <blockquote data-source-line="0">
      <p data-source-line="0">Dorothy followed her through many of the beautiful rooms in her castle.</p>
      </blockquote>
      <blockquote data-source-line="2">
      <p data-source-line="2">Dorothy followed her through many of the beautiful rooms in her castle.</p>
      <p data-source-line="4">The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>
      </blockquote>
      <blockquote data-source-line="6">
      <p data-source-line="6">Dorothy followed her through many of the beautiful rooms in her castle.</p>
      <blockquote data-source-line="8">
      <p data-source-line="8">The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>
      </blockquote>
      </blockquote>
      <blockquote data-source-line="10">
      <h4 data-source-line="10">The quarterly results look great!</h4>
      <ul data-source-line="12">
      <li data-source-line="12">Revenue was off the chart.</li>
      <li data-source-line="13">Profits were higher than ever.</li>
      </ul>
      <p data-source-line="15"><em>Everything</em> is going according to <strong>plan</strong>.</p>
      </blockquote>
    `) + '\n');
  });

  describe('lists', () => {
    const markdown = fs.readFileSync('./tests/lists.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <ol data-source-line="0">
      <li data-source-line="0">First item</li>
      <li data-source-line="1">Second item</li>
      <li data-source-line="2">Third item</li>
      <li data-source-line="3">Fourth item</li>
      </ol>
      <h1 data-source-line="5">List 2</h1>
      <ol data-source-line="6">
      <li data-source-line="6">First item</li>
      <li data-source-line="7">Second item</li>
      <li data-source-line="8">Third item</li>
      <li data-source-line="9">Fourth item</li>
      </ol>
      <h1 data-source-line="11">List 3</h1>
      <ol data-source-line="12">
      <li data-source-line="12">First item</li>
      <li data-source-line="13">Second item</li>
      <li data-source-line="14">Third item</li>
      <li data-source-line="15">Fourth item</li>
      </ol>
      <h1 data-source-line="17">List 4</h1>
      <ol data-source-line="18">
      <li data-source-line="18">First item</li>
      <li data-source-line="19">Second item</li>
      <li data-source-line="20">Third item
      <ol data-source-line="21">
      <li data-source-line="21">Indented item</li>
      <li data-source-line="22">Indented item</li>
      </ol>
      </li>
      <li data-source-line="23">Fourth item</li>
      </ol>
      <h1 data-source-line="25">List 5</h1>
      <ol data-source-line="26">
      <li data-source-line="26">First item</li>
      <li data-source-line="27">Second item</li>
      </ol>
      <h1 data-source-line="29">List 6</h1>
      <ul data-source-line="30">
      <li data-source-line="30">First item</li>
      <li data-source-line="31">Second item</li>
      <li data-source-line="32">Third item</li>
      <li data-source-line="33">Fourth item</li>
      </ul>
      <h1 data-source-line="35">List 7</h1>
      <ul data-source-line="36">
      <li data-source-line="36">First item</li>
      <li data-source-line="37">Second item</li>
      <li data-source-line="38">Third item</li>
      <li data-source-line="39">Fourth item</li>
      </ul>
      <h1 data-source-line="41">List 8</h1>
      <ul data-source-line="42">
      <li data-source-line="42">First item</li>
      <li data-source-line="43">Second item</li>
      <li data-source-line="44">Third item</li>
      <li data-source-line="45">Fourth item</li>
      </ul>
      <h1 data-source-line="47">List 9</h1>
      <ul data-source-line="48">
      <li data-source-line="48">First item</li>
      <li data-source-line="49">Second item</li>
      <li data-source-line="50">Third item
      <ul data-source-line="51">
      <li data-source-line="51">Indented item</li>
      <li data-source-line="52">Indented item</li>
      </ul>
      </li>
      <li data-source-line="53">Fourth item</li>
      </ul>
      <h1 data-source-line="55">List 10</h1>
      <ul data-source-line="56">
      <li data-source-line="56">1968\. A great year!</li>
      <li data-source-line="57">I think 1969 was second best.</li>
      </ul>
      <h1 data-source-line="59">List 11</h1>
      <ul data-source-line="60">
      <li data-source-line="60">
      <p data-source-line="60">This is the first list item.</p>
      </li>
      <li data-source-line="61">
      <p data-source-line="61">Here's the second list item.</p>
      <p data-source-line="63">I need to add another paragraph below the second list item.</p>
      </li>
      <li data-source-line="65">
      <p data-source-line="65">And here's the third list item.</p>
      </li>
      </ul>
      <h1 data-source-line="67">List 12</h1>
      <ul data-source-line="68">
      <li data-source-line="68">
      <p data-source-line="68">This is the first list item.</p>
      </li>
      <li data-source-line="69">
      <p data-source-line="69">Here's the second list item.</p>
      <blockquote data-source-line="71">
      <p data-source-line="71">A blockquote would look great below the second list item.</p>
      </blockquote>
      </li>
      <li data-source-line="73">
      <p data-source-line="73">And here's the third list item.</p>
      </li>
      </ul>
      <h1 data-source-line="75">List 13</h1>
      <ol data-source-line="76">
      <li data-source-line="76">
      <p data-source-line="76">Open the file.</p>
      </li>
      <li data-source-line="77">
      <p data-source-line="77">Find the following code block on line 21:</p>
      <pre><code> &lt;html&gt;
         &lt;head&gt;
           &lt;title&gt;Test&lt;/title&gt;
         &lt;/head&gt;
      </code></pre>
      </li>
      <li data-source-line="84">
      <p data-source-line="84">Update the title to match the name of your website.</p>
      </li>
      </ol>
      <h1 data-source-line="86">List 14</h1>
      <ol data-source-line="87">
      <li data-source-line="87">
      <p data-source-line="87">Open the file containing the Linux mascot.</p>
      </li>
      <li data-source-line="88">
      <p data-source-line="88">Marvel at its beauty.</p>
      <p data-source-line="90"><img src="/assets/images/tux.png" alt="Tux, the Linux mascot" /></p>
      </li>
      <li data-source-line="92">
      <p data-source-line="92">Close the file.</p>
      </li>
      </ol>
      <h1 data-source-line="94">List 15</h1>
      <ol data-source-line="95">
      <li data-source-line="95">First item</li>
      <li data-source-line="96">Second item</li>
      <li data-source-line="97">Third item
      <ul data-source-line="98">
      <li data-source-line="98">Indented item</li>
      <li data-source-line="99">Indented item</li>
      </ul>
      </li>
      <li data-source-line="100">Fourth item</li>
      </ol>
    `) + '\n');
  });

  describe('code', () => {
    const markdown = fs.readFileSync('./tests/code.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <p data-source-line="0">At the command prompt, type <code>nano</code>.</p>
      <p data-source-line="2"><code>Use \`code\` in your Markdown file.</code></p>
      <pre><code>&lt;html&gt;
        &lt;head&gt;
        &lt;/head&gt;
      &lt;/html&gt;
      </code></pre>
    `) + '\n');
  });

  describe('hr', () => {
    const markdown = fs.readFileSync('./tests/hr.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <hr data-source-line="0" />
      <hr data-source-line="2" />
      <hr data-source-line="4" />
    `) + '\n');
  });

  describe('links', () => {
    const markdown = fs.readFileSync('./tests/links.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <p data-source-line="0">My favorite search engine is <a href="https://duckduckgo.com">Duck Duck Go</a>.</p>
      <p data-source-line="2">My favorite search engine is <a href="https://duckduckgo.com" title="The best search engine for privacy">Duck Duck Go</a>.</p>
      <p data-source-line="4"><a href="https://www.markdownguide.org">https://www.markdownguide.org</a>
      <a href="mailto:fake@example.com">fake@example.com</a></p>
      <p data-source-line="7">I love supporting the <strong><a href="https://eff.org">EFF</a></strong>.
      This is the <em><a href="https://www.markdownguide.org">Markdown Guide</a></em>.
      See the section on <a href="#code"><code>code</code></a>.</p>
      <p data-source-line="11"><a href="https://en.wikipedia.org/wiki/Hobbit#Lifestyle" title="Hobbit lifestyles">hobbit-hole</a>
      [hobbit-hole] <a href="https://en.wikipedia.org/wiki/Hobbit#Lifestyle" title="Hobbit lifestyles">1</a></p>
    `) + '\n');
  });

  describe('images', () => {
    const markdown = fs.readFileSync('./tests/images.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <p data-source-line="0"><img src="/assets/images/san-juan-mountains.jpg" alt="The San Juan Mountains are beautiful!" title="San Juan Mountains" /></p>
      <p data-source-line="2"><a href="https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv"><img src="/assets/images/shiprock.jpg" alt="An old rock in the desert" title="Shiprock, New Mexico by Beau Rogers" /></a></p>
    `) + '\n');
  });

  describe('escaping', () => {
    const markdown = fs.readFileSync('./tests/escaping.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <p data-source-line="0">* Without the backslash, this would be a bullet in an unordered list.</p>
    `) + '\n');
  });

  it('should add line numbers to a complex markdown text', async () => {
    const markdown = fs.readFileSync('./tests/complex1.md', 'utf8');
    const html = parseMarkdown(markdown);
    expect(html.toString()).toEqual(dedent(`
      <h1 data-source-line="0">Heading 1</h1>
      <h2 data-source-line="1">Heading 2</h2>
      <p data-source-line="2">A simple paragraph. With a few words.</p>
      <ul data-source-line="3">
        <li data-source-line="4">And HTML even</li>
      </ul>
      <figure data-source-line="6"><img src="https://imgurl.com/img.png" alt="Image" data-source-line="6"></figure>
      <ul data-source-line="7">
      <li data-source-line="7">Here is</li>
      <li data-source-line="8">another list</li>
      </ul>
      <div data-source-line="9">
        <p data-source-line="10">Then a div with a paragraph.</p>
      </div>
      <div data-source-line="12"><p data-source-line="12">Another one, but on one line.</p></div>
      <p data-source-line="13">Some random</p>
      <p data-source-line="14">text on the first level</p>
      <p data-source-line="15">A paragraph</p>
      <table data-source-line="17">
      <thead>
      <tr data-source-line="17">
      <th>Month</th>
      <th>Savings</th>
      </tr>
      </thead>
      <tbody>
      <tr data-source-line="19">
      <td>January</td>
      <td>$250</td>
      </tr>
      <tr data-source-line="20">
      <td>February</td>
      <td>$80</td>
      </tr>
      <tr data-source-line="21">
      <td>March</td>
      <td>$420</td>
      </tr>
      </tbody>
      </table>
      <pre><code>&lt;div&gt;
        &lt;p&gt;A code block.&lt;/p&gt;
      &lt;/div&gt;
      </code></pre>
      <p data-source-line="29">Good bye! See you soon.</p>
    `) + '\n');
  });
});
