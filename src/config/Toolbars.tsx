import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import { Modal, Table } from 'antd';
import EmbedButton from './InsertMediaButton';
import React, { useState } from 'react';
import { TippyProps } from '@tippyjs/react';
import QuestionIcon from '../../public/question.svg';
import {
	serializeHTMLFromNodes,
	BalloonToolbar,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_CODE_BLOCK,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_OL,
	ELEMENT_UL,
	MARK_BOLD,
	MARK_CODE,
	MARK_ITALIC,
	MARK_KBD,
	MARK_UNDERLINE,
	ToolbarCodeBlock,
	ToolbarElement,
	ToolbarList,
	ToolbarMark,
	ToolbarLink,
	useStoreEditorRef,
	useEventEditorId,
	getPlatePluginType,
	MARK_HIGHLIGHT,
	useEditorRef,
	createImagePlugin,
	ELEMENT_IMAGE,
} from '@udecode/plate';
import {
	AiOutlineHighlight,
	AiOutlineBold,
	AiOutlineItalic,
} from 'react-icons/ai';
import { FaUnderline, FaKeyboard } from 'react-icons/fa';
import HeadingIcon from '../../public/H1.svg';
import QuoteIcon from '../../public/blockquote.svg';
import HeadingTwoIcon from '../../public/h2.svg';
import CodeIcon from '../../public/codeblock.svg';
import InlineCodeIcon from '../../public/inlinecode.svg';
import OLIcon from '../../public/OL.svg';
import ULIcon from '../../public/UL.svg';
import BoldIcon from '../../public/Bold.svg';
import ItalicIcon from '../../public/italics.svg';
import UnderlineIcon from '../../public/underline.svg';
import LinkIcon from '../../public/link.svg';
import EmojiButton from './EmojiPanel';
import ImageUpload from './ImageUpload';
import ImageUploadMD from './ImageUploadMD';

export const ToolbarButtonsBasicElements = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_H1)}
				icon={<HeadingIcon />}
			/>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_H2)}
				icon={<HeadingTwoIcon />}
			/>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
				icon={<QuoteIcon />}
			/>
			<ToolbarCodeBlock
				type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
				icon={<CodeIcon />}
			/>
		</>
	);
};

export const ToolbarButtonsList = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<>
			<ToolbarList
				type={getPlatePluginType(editor, ELEMENT_UL)}
				icon={<ULIcon />}
			/>
			<ToolbarList
				type={getPlatePluginType(editor, ELEMENT_OL)}
				icon={<OLIcon />}
			/>
		</>
	);
};

export const ToolbarButtonsBasicMarks = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_BOLD)}
				icon={<BoldIcon />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_ITALIC)}
				icon={<ItalicIcon />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_UNDERLINE)}
				icon={<UnderlineIcon />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_CODE)}
				icon={<InlineCodeIcon />}
			/>
		</>
	);
};

export const ToolbarKbd = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<ToolbarMark
			type={getPlatePluginType(editor, MARK_KBD)}
			icon={<FaKeyboard />}
		/>
	);
};

export const ToolbarAiOutlineHighlight = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<ToolbarMark
			type={getPlatePluginType(editor, MARK_HIGHLIGHT)}
			icon={<AiOutlineHighlight />}
		/>
	);
};

export const BallonToolbarMarks = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	const arrow = false;
	const theme = 'light';
	const direction = 'top';
	const hiddenDelay = 0;
	const tooltip: TippyProps = {
		arrow: true,
		delay: 0,
		duration: [200, 0],
		hideOnClick: false,
		offset: [0, 17],
		placement: 'top',
	};

	return (
		<BalloonToolbar
			direction={direction}
			hiddenDelay={hiddenDelay}
			theme={theme}
			arrow={arrow}
		>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_BOLD)}
				icon={<AiOutlineBold />}
				tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_ITALIC)}
				icon={<AiOutlineItalic />}
				tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_UNDERLINE)}
				icon={<FaUnderline />}
				tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
			/>
		</BalloonToolbar>
	);
};

const createCustomImagePlugin = () => {
	const plugin = createImagePlugin();
	return {
		...plugin,
		deserialize: (data: any) => {
			// @ts-ignore
			return plugin.deserialize(data);
		},
		serialize: (data: any) => {
			// console.log({ data });
			return '';
		},
	};
};

export const ToolbarButtons = ({ setIsMd }: any) => {
	const editor = useEditorRef();

	let data;
	if (typeof window !== 'undefined') {
		data = localStorage.getItem('content');
	}

	if (data !== undefined) {
		// const convertedData = JSON.parse(data);
		const convertedData = [
			{
				type: ELEMENT_IMAGE,
				url: 'https://miro.medium.com/max/38/0*pSMij0bYk4_7qywk?q=20',
				children: [
					{
						text: '',
					},
				],
				caption: [
					{
						text: 'cool',
					},
				],
			},
		];
		try {
			const theRenderedHtml = serializeHTMLFromNodes(editor, {
				// @ts-ignore
				plugins: [createCustomImagePlugin()],
				nodes: convertedData.slice(0, 6),
			});
			// console.log(theRenderedHtml);
		} catch (error) {
			// console.log(error);
		}
		// console.log(convertedData);
	}

	return (
		<>
			<ToolbarButtonsBasicElements />
			<ToolbarButtonsList />
			<ToolbarButtonsBasicMarks />
			<ToolbarLink icon={<LinkIcon />} />
			<EmojiButton />

			{/* Replace the span by intrinsic styles from the toolbar button */}
			<button
				style={{
					width: '120px',
					textAlign: 'center',
				}}
				onMouseDown={() => setIsMd((prev: boolean) => !prev)}
			>
				{'Markdown Editor'}
			</button>
		</>
	);
};

const Shortcuts = [
	{
		shortcut: '# H1 header',
		render: (
			<h1
				style={{
					fontSize: '22px',
				}}
			>
				H1 header
			</h1>
		),
	},
	{
		shortcut: '## H2 header',
		render: (
			<h2
				style={{
					fontSize: '18px',
				}}
			>
				H2 header
			</h2>
		),
	},
	{
		shortcut: '*italic*',
		render: <i>italics</i>,
	},
	{
		shortcut: '**bold**',
		render: <strong>bold</strong>,
	},
	{
		shortcut: (
			<>
				* item1
				<br />* item2
			</>
		),
		render: (
			<ul>
				<li>item1</li>
				<li>item2</li>
			</ul>
		),
	},
	{
		shortcut: (
			<>
				1. item1
				<br />
				2. item2
			</>
		),
		render: (
			<ol>
				<li>item1</li>
				<li>item2</li>
			</ol>
		),
	},
	{
		shortcut: '> quoted text',
		render: (
			<blockquote
				style={{
					background: 'rgba(0, 128, 128, 0.03)',
					borderLeft: '3px solid #008080',
					padding: '5px',
					paddingLeft: '7px',
				}}
			>
				quoted text
			</blockquote>
		),
	},
	{
		shortcut: '`inline code`',
		render: (
			<code
				style={{
					background: '#F7F7F7',
				}}
			>
				inline code
			</code>
		),
	},
];

const columns = [
	{
		title: 'Shortcuts',
		dataIndex: 'shortcut',
		key: 'shortcut',
	},
	{
		title: 'Result',
		dataIndex: 'render',
		key: 'render',
	},
];

export const ToolbarButtonsMD = ({ setIsMd, location }: any) => {
	const [visible, setVisible] = useState(false);

	function handleClose(event: any) {
		setVisible((prev) => !prev);
	}

	return (
		<>
			<Modal
				title='Shortcuts'
				visible={visible}
				onCancel={handleClose}
				style={{ top: 20 }}
				footer={null}
			>
				<Table columns={columns} dataSource={Shortcuts} pagination={false} />
			</Modal>
			<button className='flex items-center' onMouseDown={() => setVisible(true)}>
				<b>Markdown Editor</b>
				<span className="ml-1">
					<QuestionIcon />
				</span>
			</button>
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
					width: '30%',
					justifyContent: 'space-between',
				}}
			>
				<span>
					<ImageUploadMD location={location} />
				</span>
				<button onMouseDown={() => setIsMd((prev: boolean) => !prev)}>
					{'Normal Editor'}
				</button>
			</span>
		</>
	);
};
