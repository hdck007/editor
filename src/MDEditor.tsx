import React, { useMemo } from 'react';
import { debounce } from 'lodash';
import {
	ELEMENT_IMAGE,
	ELEMENT_PARAGRAPH,
	createPlateComponents,
	createPlateOptions,
	Plate,
	withProps,
	MentionElement,
	ELEMENT_MENTION,
	SPEditor,
	MARK_COLOR,
	withStyledProps,
	StyledLeaf,
	MARK_BG_COLOR,
	ELEMENT_MEDIA_EMBED,
	MediaEmbedElement,
	StyledElement,
	createReactPlugin,
	createHistoryPlugin,
	createParagraphPlugin,
	createBlockquotePlugin,
	createCodeBlockPlugin,
	createHeadingPlugin,
	createBoldPlugin,
	createItalicPlugin,
	createUnderlinePlugin,
	createStrikethroughPlugin,
	createCodePlugin,
} from '@udecode/plate';
import { ImageElement } from './elements/image/ImageElement';
import { editableProps } from './config/pluginOptions';
import { renderMentionLabel } from './config/renderMentionLabel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { createPreviewPlugin } from './markdown/createPreviewPlugin';

type TEditor = SPEditor & ReactEditor & HistoryEditor;

const id = 'Examples/MD';
let data: any = null;
if (typeof window !== 'undefined') {
	data = localStorage.getItem('content');
}

export const createElement = (
	text = '',
	{
		type = ELEMENT_PARAGRAPH,
		mark,
	}: {
		type?: string;
		mark?: string;
	} = {}
) => {
	const leaf: any = { text };
	if (mark) {
		leaf[mark] = true;
	}

	return {
		type,
		children: [leaf],
	};
};

const pluginsBasic = [
	// editor
	createReactPlugin(), // withReact
	createHistoryPlugin(), // withHistory

	// elements
	createParagraphPlugin(), // paragraph element
	createBlockquotePlugin(), // blockquote element
	createCodeBlockPlugin(), // code block element
	createHeadingPlugin(), // heading elements

	// marks
	createBoldPlugin(), // bold mark
	createItalicPlugin(), // italic mark
	createUnderlinePlugin(), // underline mark
	createStrikethroughPlugin(), // strikethrough mark
	createCodePlugin(), // code mark
];

let components = createPlateComponents({});

const mdPlugins = [...pluginsBasic, createPreviewPlugin()];

const options = createPlateOptions({
	// customize your options by plugin key
});

const MDEditor = () => {
	return (
		<div className='mx-auto my-9 w-1/2 h-5/6 md:w-6/6 pb-4'>
			<DndProvider backend={HTML5Backend}>
				<Plate
					id={id}
					plugins={mdPlugins}
					components={components}
					options={options}
					editableProps={editableProps}
				></Plate>
			</DndProvider>
		</div>
	);
};

export default MDEditor;
