# satteri-custom-header-id

[![NPM version](https://img.shields.io/npm/v/satteri-custom-header-id?color=a1b858&label=)](https://www.npmjs.com/package/satteri-custom-header-id)

A [Sätteri](https://github.com/bruits/satteri) plugin that gives a Markdown heading a custom `id` from a trailing `{#custom-id}` (or `||custom-id||`) marker.

The marker is removed from the rendered heading and used as its `id`. Headings without a marker are left untouched. This is the [Sätteri](https://github.com/bruits/satteri) port of [`remark-custom-header-id`](https://github.com/sindresorhus/remark-custom-header-id).

## Example

| Markdown                           | HTML output                           |
| ---------------------------------- | ------------------------------------- |
| `## Hello world {#custom-id}`      | `<h2 id="custom-id">Hello world</h2>` |
| `## Hello world \|\|custom-id\|\|` | `<h2 id="custom-id">Hello world</h2>` |
| `## Hello world`                   | `<h2>Hello world</h2>`                |

## Install

```bash
npm install satteri-custom-header-id satteri
```

## Usage

```js
import { markdownToHtml } from 'satteri'
import { satteriCustomHeaderId } from 'satteri-custom-header-id'

const { html } = await markdownToHtml('## Hello world {#custom-id}', {
  hastPlugins: [satteriCustomHeaderId()],
})

// html === '<h2 id="custom-id">Hello world</h2>'
```

Sätteri's built-in heading-id plugin keeps an `id` that is already set, so this plugin's custom id wins over the auto-generated slug.

### MDX

In MDX, escape the braces (`\{#custom-id\}`) so they are treated as text rather than a JSX expression:

```mdx
## Hello world \{#custom-id\}
```

## Credits

- [`remark-custom-header-id`](https://github.com/sindresorhus/remark-custom-header-id) by [Sindre Sorhus](https://github.com/sindresorhus): the original remark plugin this ports, including the `{#id}` and `||id||` syntaxes.
- [Sätteri](https://github.com/bruits/satteri): the Markdown engine this plugin runs on.

## Related

- [`remark-custom-header-id`](https://github.com/sindresorhus/remark-custom-header-id): the same feature for the [unified](https://github.com/unifiedjs/unified) / remark pipeline.
- [`satteri-resolve-markdown-links`](https://github.com/ocavue/rehype-resolve-markdown-links): another Sätteri plugin, resolving relative Markdown links to absolute URLs.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/ocavue">
    <img src="https://cdn.jsdelivr.net/gh/ocavue/sponsors/sponsorkit/sponsors.svg" alt="My Sponsors">
  </a>
</p>

## License

[MIT](./LICENSE) © [ocavue](https://github.com/ocavue)
