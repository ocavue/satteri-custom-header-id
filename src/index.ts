import type { HastPluginDefinition } from 'satteri'

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// A trailing ` {#custom-id}` or ` ||custom-id||` marker on a heading. The
// pattern (and the two supported syntaxes) come from Sindre Sorhus's
// remark-custom-header-id (MIT), so behavior matches the remark plugin.
const MARKER = / {#(?<hash>[^}]+)}$| \|\|(?<pipe>[^|]+)\|\|$/

/**
 * A [Sätteri](https://github.com/bruits/satteri) plugin that reads a trailing
 * `{#custom-id}` (or `||custom-id||`) marker from a heading, removes it from the
 * visible text, and uses it as the heading's `id`.
 *
 * Sätteri's built-in heading-id plugin keeps an `id` that is already set, so
 * this overrides the auto-generated slug.
 */
export function satteriCustomHeaderId(): HastPluginDefinition {
  return {
    name: 'satteri-custom-header-id',
    element: {
      filter: HEADING_TAGS,
      visit(node, ctx) {
        const last = node.children.at(-1)
        if (last?.type !== 'text') return

        const text = last.value.trimEnd()
        const match = MARKER.exec(text)
        if (!match) return

        const id = match.groups?.hash ?? match.groups?.pipe
        if (!id) return

        ctx.replaceNode(last, { type: 'text', value: text.slice(0, match.index) })
        ctx.setProperty(node, 'id', id)
      },
    },
  }
}
