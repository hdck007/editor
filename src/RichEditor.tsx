import React, { useMemo } from 'react';
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
	ImageElement,
} from '@udecode/plate';
import { MARK_ITALIC } from '@udecode/plate-basic-marks';
// import { initialValuePlayground } from './config/initialValues';
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

type TEditor = SPEditor & ReactEditor & HistoryEditor;

const id = 'Examples/Prototype';

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

const component = getEditableRenderLeaf({
	type: 'text',
});

// console.log(component());

let components = createPlateComponents({
	[ELEMENT_MENTION]: withProps(MentionElement, {
		renderLabel: renderMentionLabel,
	}),
	[ELEMENT_IMAGE]: withProps(ImageElement, {
		nodeProps: {
			alt: 'image',
		},
		styles: {
			root: {
				textAlign: 'center',
				height: '40rem !important',
			},
			img: {
				width: '100%',
				margin: 'auto',
				maxHeight: '38rem !important',
			},
		},
		// children: <component />,
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
// components = withStyledPlaceHolders(components);
// components = withStyledDraggables(components);

const options = createPlateOptions({
	// customize your options by plugin key
});

const Plugins = () => {
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

	return (
		<div className='container-editor mx-auto my-9 w-1/2 min-h-5/6 md:w-6/6 pb-4 overflow-y-auto relative overflow-x-hidden'>
			<DndProvider backend={HTML5Backend}>
				<Plate
					id={id}
					plugins={pluginsMemo}
					components={components}
					options={options}
					editableProps={editableProps}
					// initialValue={initialValuePlayground}
				>
					<div className='sticky top-0 z-10 bg-white'>
						<HeadingToolbar>
							<div className='w-full bg-gray-200 rounded-lg flex items-center flex-wrap py-3'>
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
