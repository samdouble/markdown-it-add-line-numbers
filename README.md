# markdown-it-add-line-numbers

[![CI](https://github.com/samdouble/markdown-it-add-line-numbers/actions/workflows/checks.yml/badge.svg)](https://github.com/samdouble/markdown-it-add-line-numbers/actions/workflows/checks.yml)
[![npm version](https://img.shields.io/npm/v/markdown-it-add-line-numbers.svg?style=flat)](https://www.npmjs.org/package/markdown-it-add-line-numbers)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/markdown-it-add-line-numbers)
[![Coverage Status](https://coveralls.io/repos/samdouble/markdown-it-add-line-numbers/badge.svg?branch=master&service=github)](https://coveralls.io/github/samdouble/markdown-it-add-line-numbers?branch=master)

A plugin for `markdown-it` that adds line numbers to generated HTML.

## Installation

With npm:

```sh
npm install --save markdown-it-add-line-numbers
```

With yarn:

```sh
yarn add markdown-it-add-line-numbers
```

## Usage

```js
import markdownit from 'markdown-it';
import { addLineNumbersPlugin } from 'markdown-it-add-line-numbers';

// ...

const md = markdownit({
  html: true,
  xhtmlOut: true,
});
md.use(addLineNumbersPlugin);
```
