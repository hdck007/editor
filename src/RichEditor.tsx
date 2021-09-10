import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import SideToolBar from './config/SideToolBar/SideToolBar';
import {
	ELEMENT_IMAGE,
	ELEMENT_PARAGRAPH,
	createPlateComponents,
	createPlateOptions,
	HeadingToolbar,
	MentionSelect,
	PlatePlugin,
	Plate,
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
	ELEMENT_MEDIA_EMBED,
	MediaEmbedElement,
	StyledElement,
	useStoreEditorRef,
	// ImageElement,
} from '@udecode/plate';
import { ImageElement } from './elements/image/ImageElement';
import {
	optionsExitBreakPlugin,
	optionsMentionPlugin,
	optionsResetBlockTypePlugin,
	optionsSoftBreakPlugin,
	optionsAutoformat,
} from './config/pluginOptions';
import { renderMentionLabel } from './config/renderMentionLabel';
import { BallonToolbarMarks, ToolbarButtons } from './config/Toolbars';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

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

const createCustomImagePlugin = () => {
	const plugin = createImagePlugin();
	return {
		...plugin,
		deserialize: (data: any) => {
			// console.log({ data });
		},
		serialize: (data: any) => {
			// console.log({ data });
			return '';
		},
	};
};

// console.log(createImagePlugin());
// console.log(createCustomImagePlugin());

export const plugins = [
	createReactPlugin(),
	createHistoryPlugin(),
	createParagraphPlugin(),
	createBlockquotePlugin(),
	createTodoListPlugin(),
	createHeadingPlugin(),
	createCustomImagePlugin(),
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
		// @ts-ignore
		createDeserializeMDPlugin({ plugins }),
		// @ts-ignore
		createDeserializeCSVPlugin({ plugins }),
		// @ts-ignore
		createDeserializeHTMLPlugin({ plugins }),
		// @ts-ignore
		createDeserializeAstPlugin({ plugins }),
	]
);

const Plugins = ({ setIsMd }: any) => {
	const [node, setNode] = useState(null);
	const [location, setLocation] = useState(null);
	const editor = useStoreEditorRef(id);

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
				console.log({ selection, container });
				if (selection?.focusNode?.nodeValue?.trim()) {
					setNode(null);
				} else {
					setNode(container as any);
					// @ts-ignore
					setLocation(editor?.selection);
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
					// @ts-ignore
					setLocation(editor?.selection);
				}
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

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

	function storeInLocal() {}

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

	// console.log(JSON.parse(data));

	return (
		<>
			<br />
			<div className='mx-auto my-9 w-1/2 h-5/6 md:w-6/6 pb-4'>
				<DndProvider backend={HTML5Backend}>
					<Plate
						id={id}
						plugins={pluginsMemo}
						components={components}
						options={options}
						editableProps={editableProps}
						onChange={(value) => {
							const content = JSON.stringify(value);
							localStorage.setItem('content', content);
							return debounce(storeInLocal, 300);
						}}
						initialValue={data ? JSON.parse(data) : info}
					>
						<SideToolBar node={node} setNode={setNode} />
						<div className='z-10 fixed top-0 w-full bg-white'>
							<HeadingToolbar
								style={{
									border: 'none',
								}}
							>
								<div className='w-1/2 z-10 rounded-lg flex items-center justify-around flex-wrap'>
									<ToolbarButtons setIsMd={setIsMd} />
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
		</>
	);
};

export default Plugins;
