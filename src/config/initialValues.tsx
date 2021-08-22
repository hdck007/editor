/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@udecode/plate-test-utils'
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_LI,
  ELEMENT_LIC,
  ELEMENT_LINK,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TODO_LI,
  ELEMENT_TR,
  ELEMENT_UL,
  MARK_BG_COLOR,
  MARK_BOLD,
  MARK_CODE,
  MARK_COLOR,
  MARK_HIGHLIGHT,
  MARK_ITALIC,
  MARK_KBD,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@udecode/plate'
import { createList, createElement, getNodesWithRandomId } from './utils'

export const initialValueEmpty: any = (
  <fragment>
    <hp>
      <htext />
    </hp>
  </fragment>
)

export const initialValueExcalidraw: any = (
  <fragment>
    <hh2>🎨 Excalidraw</hh2>
    <hp>Embed Excalidraw within your Slate document!</hp>
    <element type="excalidraw">
      <htext />
    </element>
    <hp>Try it out!</hp>
  </fragment>
)

export const initialValuePlaceholder: any = (
  <fragment>
    <hh1>
      <htext />
    </hh1>
    <hp>
      <htext />
    </hp>
  </fragment>
)

export const initialValueEmbeds: any = (
  <fragment>
    <hh2>🎥 Media Embed</hh2>
    <hp>
      In addition to simple image nodes, you can actually create complex
      embedded nodes. For example, this one contains an input element that lets
      you change the video being rendered!
    </hp>
    <hmediaembed url="https://player.vimeo.com/video/26689853">
      <htext />
    </hmediaembed>
    <hp>
      Try it out! This editor is built to handle Vimeo embeds, but you could
      handle any type.
    </hp>
  </fragment>
)

export const initialValueForcedLayout: any = (
  <fragment>
    <hh1>
      <htext />
    </hh1>
    <hp>
      This example shows how to enforce your layout with domain-specific
      constraints. This document will always have a title block at the top and a
      trailing paragraph. Try deleting them and see what happens!
    </hp>
    <hp>
      Slate editors can edit complex, nested data structures. And for the most
      part this is great. But in certain cases inconsistencies in the data
      structure can be introduced—most often when allowing a user to paste
      arbitrary richtext content.
    </hp>
    <hp>
      "Normalizing" is how you can ensure that your editor's content is always
      of a certain shape. It's similar to "validating", except instead of just
      determining whether the content is valid or invalid, its job is to fix the
      content to make it valid again.
    </hp>
  </fragment>
)

export const initialValueBalloonToolbar: any = (
  <fragment>
    <hp>
      This example shows how you can make a hovering menu appear above your
      content, which you can use to make text <htext bold>bold</htext>,{' '}
      <htext italic>italic</htext>, or anything else you might want to do!
    </hp>
    <hp>
      Try it out yourself! Just{' '}
      <htext bold>select any piece of text and the menu will appear</htext>.
    </hp>
    <hp>
      You can enable and customize the tooltip on each toolbar button. Check
      Tippy.js documentation for more info!
    </hp>
  </fragment>
)

export const initialValueImages: any = (
  <fragment>
    <hh2>📷 Image</hh2>
    <hp>
      In addition to nodes that contain editable text, you can also create other
      types of nodes, like images or videos.
    </hp>
    <himg url="https://source.unsplash.com/kFrdX5IeQzI">
      <htext />
    </himg>
    <hp>
      This example shows images in action. It features two ways to add images.
      You can either add an image via the toolbar icon above, or if you want in
      on a little secret, copy an image URL to your keyboard and paste it
      anywhere in the editor! Additionally, you can customize the toolbar button
      to load an url asynchronously, for example showing a file picker and
      uploading a file to Amazon S3.
    </hp>
  </fragment>
)

export const initialValueLinks: any = (
  <fragment>
    <hh2>🔗 Link</hh2>
    <hp>
      In addition to block nodes, you can create inline nodes, like{' '}
      <ha url="https://en.wikipedia.org/wiki/Hypertext">hyperlinks</ha>!
    </hp>
    <hp>
      This example shows hyperlinks in action. It features two ways to add
      links. You can either add a link via the toolbar icon above, or if you
      want in on a little secret, copy a URL to your keyboard and paste it while
      a range of text is selected.
    </hp>
  </fragment>
)

export const initialValuePreview: any = (
  <fragment>
    <hh1>👀 Preview Markdown</hh1>
    <hp>
      Slate is flexible enough to add **decorations** that can format text based
      on its content. For example, this editor has **Markdown** preview
      decorations on it, to make it _dead_ simple to make an editor with
      built-in `Markdown` previewing.
    </hp>
    <hp>- List.</hp>
    <hp> Blockquote.</hp>
    <hp>---</hp>
    <hp>## Try it out!</hp>
    <hp>Try it out for yourself!</hp>
  </fragment>
)

export const initialValueAutoformat: any = (
  <fragment>
    <hh1>🏃‍♀️ Autoformat</hh1>
    <hp>
      The editor gives you full control over the logic you can add. For example,
      it's fairly common to want to add markdown-like shortcuts to editors.
    </hp>
    <hp>While typing, try these (mark rules):</hp>
    <hul>
      <hli>
        <hlic>
          Type <htext code>**</htext> or <htext code>__</htext> on either side
          of your text to add **bold* mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>*</htext> or <htext code>_</htext> on either side of
          your text to add *italic mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>`</htext> on either side of your text to add `inline
          code mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>~~</htext> on either side of your text to add
          ~~strikethrough~ mark.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Note that nothing happens when there is a character before, try
          on:*bold
        </hlic>
      </hli>
      <hli>
        <hlic>
          We even support smart quotes, try typing{' '}
          <htext code>"hello" 'world'</htext>.
        </hlic>
      </hli>
    </hul>
    <hp>
      At the beginning of any new block or existing block, try these (block
      rules):
    </hp>
    <hul>
      <hli>
        <hlic>
          Type <htext code>*</htext>, <htext code>-</htext> or{' '}
          <htext code>+</htext> followed by <htext code>space</htext> to create
          a bulleted list.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>1.</htext> or <htext code>1)</htext> followed by{' '}
          <htext code>space</htext> to create a numbered list.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>&gt;</htext> followed by <htext code>space</htext> to
          create a block quote.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>```</htext> to create a code block.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>#</htext> followed by <htext code>space</htext> to
          create an H1 heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>##</htext> followed by <htext code>space</htext> to
          create an H2 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>###</htext> followed by <htext code>space</htext> to
          create an H3 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>####</htext> followed by <htext code>space</htext> to
          create an H4 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>#####</htext> followed by <htext code>space</htext>{' '}
          to create an H5 sub-heading.
        </hlic>
      </hli>
      <hli>
        <hlic>
          Type <htext code>######</htext> followed by <htext code>space</htext>{' '}
          to create an H6 sub-heading.
        </hlic>
      </hli>
    </hul>
  </fragment>
)

export const initialValueMentions: any = (
  <fragment>
    <hh2>💬 Mention</hh2>
    <hp>
      This example shows how you might implement a simple @-mentions feature
      that lets users autocomplete mentioning a user by their username. Which,
      in this case means Star Wars characters. The mentions are rendered as void
      inline elements inside the document.
    </hp>
    <hp>
      Try mentioning characters, like{' '}
      <hmention value="289">
        <htext />
      </hmention>{' '}
      or{' '}
      <hmention value="224">
        <htext />
      </hmention>
      !
    </hp>
  </fragment>
)

export const initialValuePasteHtml: any = [
  {
    type: ELEMENT_H1,
    children: [
      {
        text: '🍪 Deserialize HTML',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          "By default, pasting content into a Slate editor will use the clipboard's ",
      },
      { text: "'text/plain'", code: true },
      {
        text:
          " data. That's okay for some use cases, but sometimes you want users to be able to paste in content and have it maintain its formatting. To do this, your editor needs to handle ",
      },
      { text: "'text/html'", code: true },
      { text: ' data. ' },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [{ text: 'This is an example of doing exactly that!' }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          "Try it out for yourself! Copy and paste some rendered HTML rich text content (not the source code) from another site into this editor and it's formatting should be preserved.",
      },
    ],
  },
]

export const initialValuePasteMd: any = [
  {
    type: ELEMENT_H1,
    children: [
      {
        text: '🍩 Deserialize Markdown',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          "By default, pasting content into a Slate editor will use the clipboard's ",
      },
      { text: "'text/plain'", code: true },
      {
        text:
          " data. That's okay for some use cases, but sometimes you want users to be able to paste in content and have it maintain its formatting. To do this, your editor needs to handle ",
      },
      { text: "'text/html'", code: true },
      { text: ' data. ' },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [{ text: 'This is an example of doing exactly that!' }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'Try it out for yourself! Copy and paste Markdown content from ',
      },
      {
        type: ELEMENT_LINK,
        url: 'https://markdown-it.github.io/',
        children: [{ text: 'https://markdown-it.github.io/' }],
      },
      { text: '' },
    ],
  },
]

export const initialValuePlainText: any = [
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          'This is editable plain text without plugins, just like a <textarea>!',
      },
    ],
  },
]

export const initialValueBasicMarks: any = [
  createElement('💅 Marks', { type: ELEMENT_H1 }),
  createElement('💧 Basic Marks', { type: ELEMENT_H2 }),
  createElement(
    'The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.'
  ),
  createElement(
    'You can customize the type, the component and the hotkey for each of these.'
  ),
  createElement('This text is bold.', { mark: MARK_BOLD }),
  createElement('This text is italic.', { mark: MARK_ITALIC }),
  createElement('This text is underlined.', {
    mark: MARK_UNDERLINE,
  }),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic and underlined.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
  createElement('This is a strikethrough text.', {
    mark: MARK_STRIKETHROUGH,
  }),
  createElement('This is an inline code.', { mark: MARK_CODE }),
]

export const initialValueMarks = [
  ...initialValueBasicMarks,
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      { text: 'These are ' },
      { text: 'a subscript', [MARK_SUBSCRIPT]: true },
      { text: ' and ' },
      { text: 'a superscript', [MARK_SUPERSCRIPT]: true },
      { text: '.' },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      { text: 'You can also press ' },
      { text: 'Super + B', [MARK_KBD]: true },
      { text: ' to mark selected text bold or ' },
      { text: 'Super + I', [MARK_KBD]: true },
      { text: ' to mark it italic.' },
    ],
  },
  createElement('There are many other keyboard shortcuts.'),
]

export const initialValueFont = [
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text has white color and black background.',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: 'black',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text has a custom color used for text and background.',
        [MARK_COLOR]: 'grey',
        [MARK_BG_COLOR]: 'cyan',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text has',
      },
      {
        text: ' ',
        [MARK_BG_COLOR]: '#dc3735',
      },
      {
        text: 'm',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#df4538',
      },
      {
        text: 'u',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#e2533a',
      },
      {
        text: 'l',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#e6603d',
      },
      {
        text: 't',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#e96f40',
      },
      {
        text: 'i',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#ec7d43',
      },
      {
        text: 'p',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#ef8a45',
      },
      {
        text: 'l',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#f29948',
      },
      {
        text: 'e',
        [MARK_COLOR]: 'white',
        [MARK_BG_COLOR]: '#f5a74b',
      },
      {
        text: ' ',
        [MARK_BG_COLOR]: '#f9b44e',
      },
      {
        text: 'f',
        [MARK_COLOR]: '#ff0000',
      },
      {
        text: 'o',
        [MARK_COLOR]: '#ff3333',
      },
      {
        text: 'n',
        [MARK_COLOR]: '#ff6666',
      },
      {
        text: 't',
        [MARK_COLOR]: '#ff9999',
      },
      {
        text: ' ',
      },
      {
        text: 'c',
        [MARK_COLOR]: '#ffcccc',
      },
      {
        text: 'o',
        [MARK_COLOR]: '#ffcccc',
      },
      {
        text: 'l',
        [MARK_COLOR]: '#ccffcc',
      },
      {
        text: 'o',
        [MARK_COLOR]: '#99ff99',
      },
      {
        text: 'r',
        [MARK_COLOR]: '#66ff66',
      },
      {
        text: 's',
        [MARK_COLOR]: '#33ff33',
      },
      {
        text: ' and ',
      },
      {
        text: 'font',
        [MARK_BG_COLOR]: '#a58ce1',
      },
      {
        text: ' ',
      },
      {
        text: 'background',
        [MARK_BG_COLOR]: '#99cc62',
      },
      {
        text: ' ',
      },
      {
        text: 'colors',
        [MARK_BG_COLOR]: '#e45260',
      },
      {
        text: '.',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic, underlined and colored.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
        [MARK_COLOR]: '#f92672',
      },
    ],
  },
]

export const initialValueHighlight: any = [
  {
    type: ELEMENT_H2,
    children: [
      {
        text: '🌈 Highlight',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'The Highlight plugin enables support for ',
      },
      {
        text: 'highlights',
        [MARK_HIGHLIGHT]: true,
      },
      {
        text:
          ', useful when reviewing content or highlighting it for future reference.',
      },
    ],
  },
]

export const initialValueBasicElements: any = [
  createElement('🧱 Elements', { type: ELEMENT_H1 }),
  createElement('🔥 Basic Elements', { type: ELEMENT_H2 }),
  createElement('These are the most common elements, known as blocks:'),
  createElement('Heading 1', { type: ELEMENT_H1 }),
  createElement('Heading 2', { type: ELEMENT_H2 }),
  createElement('Heading 3', { type: ELEMENT_H3 }),
  createElement('Heading 4', { type: ELEMENT_H4 }),
  createElement('Heading 5', { type: ELEMENT_H5 }),
  createElement('Heading 6', { type: ELEMENT_H6 }),
  createElement('Blockquote', { type: ELEMENT_BLOCKQUOTE }),
  {
    type: ELEMENT_CODE_BLOCK,
    children: [
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const a = 'Hello';",
          },
        ],
      },
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const b = 'World';",
          },
        ],
      },
    ],
  },
]

export const initialValueList: any = [
  {
    type: ELEMENT_H2,
    children: [{ text: '✍️ List' }],
  },
  { type: ELEMENT_LIC, children: [{ text: '' }] },
  {
    type: ELEMENT_UL,
    children: [
      {
        type: ELEMENT_LI,
        children: [
          {
            type: ELEMENT_LIC,
            children: [{ text: 'Bulleted list' }],
          },
          {
            type: ELEMENT_UL,
            children: [
              {
                type: ELEMENT_LI,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [{ text: 'support' }],
                  },
                  {
                    type: ELEMENT_UL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [{ text: 'a' }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: ELEMENT_LI,
                children: [
                  {
                    type: ELEMENT_LIC,
                    children: [{ text: 'nesting' }],
                  },
                  {
                    type: ELEMENT_UL,
                    children: [
                      {
                        type: ELEMENT_LI,
                        children: [
                          {
                            type: ELEMENT_LIC,
                            children: [{ text: 'b' }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: ELEMENT_LI,
        children: [
          {
            type: ELEMENT_LIC,
            children: [{ text: 'c' }],
          },
        ],
      },
    ],
  },
  {
    type: ELEMENT_OL,
    children: [
      {
        type: ELEMENT_LI,
        children: [
          {
            type: ELEMENT_LIC,
            children: [{ text: 'Numbered list' }],
          },
        ],
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          'With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!',
      },
    ],
  },
  {
    type: ELEMENT_TODO_LI,
    checked: true,
    children: [{ text: 'Slide to the left.' }],
  },
  {
    type: ELEMENT_TODO_LI,
    checked: true,
    children: [{ text: 'Slide to the right.' }],
  },
  {
    type: ELEMENT_TODO_LI,
    checked: false,
    children: [{ text: 'Criss-cross.' }],
  },
  {
    type: ELEMENT_TODO_LI,
    checked: true,
    children: [{ text: 'Criss-cross!' }],
  },
  {
    type: ELEMENT_TODO_LI,
    checked: false,
    children: [{ text: 'Cha cha real smooth…' }],
  },
  {
    type: ELEMENT_TODO_LI,
    checked: false,
    children: [{ text: "Let's go to work!" }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export const initialValueSearchHighlighting: any = [
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          'This is editable text that you can search. As you search, it looks for matching strings of text, and adds ',
      },
      { text: 'decorations', [MARK_BOLD]: true },
      { text: ' to them in realtime.' },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'Try it out for yourself by typing in the search box above!',
      },
    ],
  },
]

const createTable = () => ({
  type: ELEMENT_TABLE,
  children: [
    {
      type: ELEMENT_TR,
      children: [
        {
          type: ELEMENT_TD,
          children: [createElement('')],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('Human', { mark: MARK_BOLD })],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('Dog', { mark: MARK_BOLD })],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('Cat', { mark: MARK_BOLD })],
        },
      ],
    },
    {
      type: ELEMENT_TR,
      children: [
        {
          type: ELEMENT_TD,
          children: [createElement('# of Feet', { mark: MARK_BOLD })],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('2')],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('4')],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('4')],
        },
      ],
    },
    {
      type: ELEMENT_TR,
      children: [
        {
          type: ELEMENT_TD,
          children: [createElement('# of Lives', { mark: MARK_BOLD })],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('1')],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('1')],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('9')],
        },
      ],
    },
  ],
})

const createSpanningTable = () => ({
  type: ELEMENT_TABLE,
  children: [
    {
      type: ELEMENT_TR,
      children: [
        {
          type: ELEMENT_TH,
          attributes: { colspan: '2' },
          children: [createElement('Heading', { mark: MARK_BOLD })],
        },
      ],
    },
    {
      type: ELEMENT_TR,
      children: [
        {
          type: ELEMENT_TD,
          children: [createElement('Cell 1', { mark: MARK_BOLD })],
        },
        {
          type: ELEMENT_TD,
          children: [createElement('Cell 2')],
        },
      ],
    },
  ],
})

export const initialValueTables: any = [
  {
    type: ELEMENT_H2,
    children: [
      {
        text: '🏓 Table',
      },
    ],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          'Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:',
      },
    ],
  },
  createTable(),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          "This table is just a basic example of rendering a table, and it doesn't have fancy functionality. But you could augment it to add support for navigating with arrow keys, displaying table headers, adding column and rows, or even formulas if you wanted to get really crazy!",
      },
    ],
  },
  createSpanningTable(),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text:
          'This table is an example of rendering a table spanning multiple columns.',
      },
    ],
  },
]

export const initialValueSoftBreak: any = [
  {
    type: ELEMENT_H1,
    children: [{ text: '🍦 Soft Break ⇧⏎' }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'You can define a set of rules with:',
      },
    ],
  },
  ...createList([
    'hotkey – e.g. press ⇧⏎ anywhere to insert a soft break 👇',
    'query – filter the block types where the rule applies, e.g. pressing ⏎ will insert a soft break only inside block quotes and code blocks.',
  ]),
  {
    type: ELEMENT_BLOCKQUOTE,
    children: [{ text: 'Try here ⏎' }],
  },
  {
    type: ELEMENT_CODE_BLOCK,
    children: [{ text: 'And ⏎ here.' }],
  },
]

export const initialValueExitBreak: any = [
  {
    type: ELEMENT_H1,
    children: [{ text: '⏎ Exit Break ⏎' }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'You can define a set of rules with:',
      },
    ],
  },
  ...createList([
    'hotkey – e.g. press ⌘⏎ to exit to the next block 👇',
    'query – Filter the block types where the rule applies.',
    'level – Path level where the exit is.',
    'before – If true, exit to the previous block. e.g. press ⇧⌘⏎ to exit before the selected block 👆',
  ]),
  {
    type: ELEMENT_BLOCKQUOTE,
    children: [{ text: 'Try here ⌘⏎' }],
  },
  {
    type: ELEMENT_CODE_BLOCK,
    children: [{ text: 'And in the middle ⌘⏎ of the block.' }],
  },
  {
    type: ELEMENT_PARAGRAPH,
    children: [{ text: 'It also works for nested blocks:' }],
  },
  createTable(),
]

export const initialValuePlayground: any = getNodesWithRandomId([
  ...initialValueForcedLayout,
  ...initialValueBasicMarks,
  ...initialValueFont,
  ...initialValueHighlight,
  ...initialValueBasicElements,
  ...initialValueList,
  ...initialValueTables,
  ...initialValueLinks,
  ...initialValueMentions,
  ...initialValueImages,
  ...initialValueEmbeds,
  ...initialValueAutoformat,
  ...initialValueSoftBreak,
  ...initialValueExitBreak,
  ...initialValuePasteHtml,
])
