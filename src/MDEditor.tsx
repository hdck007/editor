import React, { useMemo, useState } from 'react';
import { ToolbarButtons, ToolbarButtonsMD } from './config/Toolbars';
import {
	ELEMENT_PARAGRAPH,
	createPlateComponents,
	createPlateOptions,
	Plate,
	HeadingToolbar,
	SPEditor,
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
	createImagePlugin,
	ELEMENT_IMAGE,
	withProps,
	ImageElement,
	useStoreEditorRef,
} from '@udecode/plate';
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

	createImagePlugin(),
];

let components = createPlateComponents({
	[ELEMENT_IMAGE]: withProps(ImageElement, {
		nodeProps: {
			alt: 'image',
			data: 'useless',
		},
		styles: {
			root: {
				maxHeight: '40rem !important',
			},
			img: {
				width: '100%',
				maxHeight: '40rem !important',
			},
		},
	}),
});

const mdPlugins = [...pluginsBasic, createPreviewPlugin()];

const options = createPlateOptions({
	// customize your options by plugin key
});

const MDEditor = ({ setIsMd }: any) => {
	const [node, setNode] = useState(null);
	const editor = useStoreEditorRef(id);
	const [location, setLocation] = useState(null);

	const editableProps = useMemo(
		() => ({
			placeholder: 'Enter some rich text…',
			spellCheck: false,
			padding: '0 30px',
			onMouseUp: (event: any) => {
				const selection = window.getSelection();
				const container =
					selection?.focusNode?.parentNode?.parentNode?.parentNode
						?.parentElement;
				if (selection?.focusNode?.nodeValue?.trim()) {
					setNode(null);
				} else {
					setNode(container as any);
				}
			},
			onKeyUp: (event: any) => {
				const selection = window.getSelection();
				const container =
					selection?.focusNode?.parentNode?.parentNode?.parentNode
						?.parentElement;
				if (selection?.focusNode?.nodeValue?.trim()) {
					setNode(null);
				} else {
					setNode(container as any);
				}
			},
			onBlur: (event: any) => {
				if (editor && editor?.selection) {
					// @ts-ignore
					console.log(editor.selection);
					// @ts-ignore
					setLocation(editor.selection);
				}
			},
		}),
		[]
	);

	return (
		<>
			<br />
			<div className='mx-auto my-9 w-1/2 h-5/6 pb-4'>
				<DndProvider backend={HTML5Backend}>
					<Plate
						id={id}
						plugins={mdPlugins}
						components={components}
						options={options}
						editableProps={editableProps}
					>
						<div className='left-1/4 z-10 fixed top-0 w-full bg-white'>
							<HeadingToolbar
								style={{
									border: 'none',
								}}
							>
								<div className='w-1/2 rounded-lg flex items-center justify-between flex-wrap py-3'>
									<ToolbarButtonsMD setIsMd={setIsMd} location={location} />
								</div>
							</HeadingToolbar>
						</div>
					</Plate>
				</DndProvider>
			</div>
		</>
	);
};

export default MDEditor;
