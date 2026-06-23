import { markdownToHtml } from 'satteri'
import { describe, expect, it } from 'vitest'

import { satteriCustomHeaderId } from './index'

async function render(markdown: string): Promise<string> {
  const { html } = await markdownToHtml(markdown, {
    hastPlugins: [satteriCustomHeaderId()],
  })
  return html.trim()
}

describe('satteriCustomHeaderId', () => {
  it('sets the id from a {#...} marker and strips it', async () => {
    expect(await render('### Hello World {#my-custom-id}')).toBe(
      '<h3 id="my-custom-id">Hello World</h3>',
    )
  })

  it('supports the ||...|| marker', async () => {
    expect(await render('## Heading ||piped-id||')).toBe('<h2 id="piped-id">Heading</h2>')
  })

  it('leaves a heading without a marker untouched', async () => {
    expect(await render('## Just a heading')).toBe('<h2>Just a heading</h2>')
  })

  it('only matches a marker at the very end of the heading', async () => {
    expect(await render('## Foo {#bar} baz')).toBe('<h2>Foo {#bar} baz</h2>')
  })

  it('keeps text before the marker, including inline markup', async () => {
    expect(await render('## Hello **world** {#mixed}')).toBe(
      '<h2 id="mixed">Hello <strong>world</strong></h2>',
    )
  })

  it('works across every heading level', async () => {
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
      const hashes = '#'.repeat(level)
      expect(await render(`${hashes} Title {#id-${level}}`)).toBe(
        `<h${level} id="id-${level}">Title</h${level}>`,
      )
    }
  })
})
