import React, { useMemo } from 'react';
import { debounce } from 'lodash';
import {
	ELEMENT_IMAGE,
	ELEMENT_PARAGRAPH,
	createPlateComponents,
	createPlateOptions,
	HeadingToolbar,
	MentionSelect,
	PlatePlugin,
	Plate,
	ToolbarSearchHighlight,
	createAlignPlugin,
	createAutoformatPlugin,
	createBlockquotePlugin,
	createBoldPlugin,
	createCodeBlockPlugin,
	createCodePlugin,
	createExitBreakPlugin,
	createHeadingPlugin,
	createHighlightPlugin,
	createHistoryPlugin,
	createKbdPlugin,
	createImagePlugin,
	createItalicPlugin,
	createLinkPlugin,
	createListPlugin,
	createMediaEmbedPlugin,
	createNodeIdPlugin,
	createParagraphPlugin,
	createReactPlugin,
	createResetNodePlugin,
	createSelectOnBackspacePlugin,
	createSoftBreakPlugin,
	createDndPlugin,
	createStrikethroughPlugin,
	createSubscriptPlugin,
	createSuperscriptPlugin,
	createTablePlugin,
	createTodoListPlugin,
	createTrailingBlockPlugin,
	createUnderlinePlugin,
	createDeserializeHTMLPlugin,
	useFindReplacePlugin,
	useMentionPlugin,
	withProps,
	MentionElement,
	ELEMENT_MENTION,
	SPEditor,
	MARK_COLOR,
	withStyledProps,
	StyledLeaf,
	MARK_BG_COLOR,
	createFontColorPlugin,
	createFontBackgroundColorPlugin,
	createDeserializeMDPlugin,
	createDeserializeCSVPlugin,
	createDeserializeAstPlugin,
	getEditableRenderLeaf,
	ELEMENT_MEDIA_EMBED,
	MediaEmbedElement,
	StyledElement,
	getPlateState,
	useEditorRef,
} from '@udecode/plate';
import { MARK_ITALIC } from '@udecode/plate-basic-marks';
// import { initialValuePlayground } from './config/initialValues';
import { ImageElement } from './elements/image/ImageElement';
import {
	editableProps,
	optionsExitBreakPlugin,
	optionsMentionPlugin,
	optionsResetBlockTypePlugin,
	optionsSoftBreakPlugin,
	optionsAutoformat,
} from './config/pluginOptions';
import { renderMentionLabel } from './config/renderMentionLabel';
import { BallonToolbarMarks, ToolbarButtons } from './config/Toolbars';
// import { withStyledPlaceHolders } from './config/withStylePlaceHolders';
// import { withStyledDraggables } from './config/withStylesDraggable';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { Editor } from 'slate';
import { createBasicPlugin } from './config/pluginOptions';
import { useState } from 'react';

type TEditor = SPEditor & ReactEditor & HistoryEditor;

const id = 'Examples/Prototype';
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

// console.log(component());

let components = createPlateComponents({
	[ELEMENT_MENTION]: withProps(MentionElement, {
		renderLabel: renderMentionLabel,
	}),
	['BASIC_PLUGIN']: withProps(StyledElement, {
		styles: {
			root: {
				background: 'red !important',
			},
		},
	}),

	['hr_line']: withProps(StyledElement, {
		as: 'hr',
	}),

	[ELEMENT_IMAGE]: withProps(ImageElement, {
		nodeProps: {
			alt: 'image',
		},
		styles: {
			root: {
				textAlign: 'center',
				maxHeight: '40rem !important',
			},
			img: {
				width: '100%',
				maxHeight: '40rem !important',
			},
		},
	}),
	[ELEMENT_MEDIA_EMBED]: withProps(MediaEmbedElement, {
		styles: {
			input: {
				display: 'none',
			},
		},
	}),
	// [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
	[MARK_COLOR]: withStyledProps(StyledLeaf, {
		leafProps: {
			[MARK_COLOR]: ['color'],
		},
	}),
	[MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
		leafProps: {
			[MARK_BG_COLOR]: ['backgroundColor'],
		},
	}),
	// customize your components by plugin key
});

const options = createPlateOptions({
	// customize your options by plugin key
});

export const plugins = [
	createReactPlugin(),
	createHistoryPlugin(),
	createParagraphPlugin(),
	createBlockquotePlugin(),
	createTodoListPlugin(),
	createHeadingPlugin(),
	createImagePlugin(),
	createLinkPlugin(),
	createListPlugin(),
	createTablePlugin(),
	createMediaEmbedPlugin(),
	createCodeBlockPlugin(),
	// createExcalidrawPlugin(),
	createAlignPlugin(),
	createBoldPlugin(),
	createCodePlugin(),
	createItalicPlugin(),
	createHighlightPlugin(),
	createUnderlinePlugin(),
	createStrikethroughPlugin(),
	createSubscriptPlugin(),
	createSuperscriptPlugin(),
	createFontColorPlugin(),
	createFontBackgroundColorPlugin(),
	createKbdPlugin(),
	createNodeIdPlugin(),
	createDndPlugin(),
	createAutoformatPlugin(optionsAutoformat),
	createResetNodePlugin(optionsResetBlockTypePlugin),
	createSoftBreakPlugin(optionsSoftBreakPlugin),
	createExitBreakPlugin(optionsExitBreakPlugin),
	createTrailingBlockPlugin({
		type: ELEMENT_PARAGRAPH,
	}),
	createSelectOnBackspacePlugin({
		allow: [ELEMENT_IMAGE],
	}),
];

plugins.push(
	...[
		createDeserializeMDPlugin({ plugins }),
		createDeserializeCSVPlugin({ plugins }),
		createDeserializeHTMLPlugin({ plugins }),
		createDeserializeAstPlugin({ plugins }),
	]
);

const Plugins = () => {
	// const [editorValue, setEditorValue] = useState(
	// 	data ? JSON.parse(data) : null
	// );
	// const slate = getPlateState(id);
	console.log(getPlateState);
	const info = [
		{
			type: ELEMENT_PARAGRAPH,
			children: [
				{
					text: '',
				},
			],
		},
	];

	const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin();
	const { getMentionSelectProps, plugin: mentionPlugin } =
		useMentionPlugin(optionsMentionPlugin);
	const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
		const plugins = [
			createReactPlugin(),
			createHistoryPlugin(),
			createParagraphPlugin(),
			createBlockquotePlugin(),
			createTodoListPlugin(),
			createHeadingPlugin(),
			createImagePlugin(),
			createLinkPlugin(),
			createListPlugin(),
			createTablePlugin(),
			createMediaEmbedPlugin(),
			createCodeBlockPlugin(),
			// createExcalidrawPlugin(),
			createAlignPlugin(),
			createBoldPlugin(),
			createCodePlugin(),
			createItalicPlugin(),
			createHighlightPlugin(),
			createUnderlinePlugin(),
			createStrikethroughPlugin(),
			createSubscriptPlugin(),
			createSuperscriptPlugin(),
			createFontColorPlugin(),
			createFontBackgroundColorPlugin(),
			createKbdPlugin(),
			createNodeIdPlugin(),
			createDndPlugin(),
			createAutoformatPlugin(optionsAutoformat),
			createResetNodePlugin(optionsResetBlockTypePlugin),
			createSoftBreakPlugin(optionsSoftBreakPlugin),
			createExitBreakPlugin(optionsExitBreakPlugin),
			createTrailingBlockPlugin({
				type: ELEMENT_PARAGRAPH,
			}),
			createSelectOnBackspacePlugin({
				allow: [ELEMENT_IMAGE],
			}),
			// createBasicPlugin(),
			mentionPlugin,
			searchHighlightPlugin,
		];

		plugins.push(
			...[
				createDeserializeMDPlugin({ plugins }),
				createDeserializeCSVPlugin({ plugins }),
				createDeserializeHTMLPlugin({ plugins }),
				createDeserializeAstPlugin({ plugins }),
			]
		);

		return plugins;
	}, [mentionPlugin, searchHighlightPlugin]);

	function storeInLocal() {
		console.log('This');
		// const content = JSON.stringify(editor);
		// localStorage.setItem('content', content)
	}

	// function debounceWrapper(value: any) {
	// 	let timer: any;
	// 	return function () {
	// 		let context = this,
	// 			args = arguments;
	// 		clearTimeout(timer);
	// 		timer = setTimeout(() => {
	// 			storeInLocal.apply(context, []);
	// 		}, 300);
	// 	};
	// }

	return (
		<div className='mx-auto my-9 w-1/2 h-5/6 md:w-6/6 pb-4'>
			<DndProvider backend={HTML5Backend}>
				<Plate
					id={id}
					plugins={pluginsMemo}
					components={components}
					options={options}
					editableProps={editableProps}
					onChange={(value) => {
						// console.log(value);
						const content = JSON.stringify(value);
						localStorage.setItem('content', content);
						return debounce(storeInLocal, 300);
					}}
					initialValue={data ? JSON.parse(data) : info}
				>
					<div className='bg-white relative'>
						<HeadingToolbar>
							<div className='w-full sticky z-10 bg-gray-200 rounded-lg flex items-center flex-wrap py-3'>
								<ToolbarButtons />
							</div>
						</HeadingToolbar>
					</div>
					<BallonToolbarMarks />
					<MentionSelect
						{...getMentionSelectProps()}
						renderLabel={renderMentionLabel}
					/>
				</Plate>
			</DndProvider>
		</div>
	);
};

export default Plugins;
