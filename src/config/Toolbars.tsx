import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import { Modal } from 'antd';
import EmbedButton from './InsertMediaButton';
import React from 'react';
import { TippyProps } from '@tippyjs/react';
import {
	ToolbarButton,
	addColumn,
	addRow,
	BalloonToolbar,
	deleteColumn,
	deleteRow,
	deleteTable,
	ELEMENT_ALIGN_CENTER,
	ELEMENT_ALIGN_JUSTIFY,
	ELEMENT_ALIGN_RIGHT,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_CODE_BLOCK,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
	ELEMENT_OL,
	ELEMENT_UL,
	insertTable,
	MARK_BOLD,
	MARK_CODE,
	MARK_ITALIC,
	MARK_KBD,
	MARK_STRIKETHROUGH,
	MARK_SUBSCRIPT,
	MARK_SUPERSCRIPT,
	MARK_UNDERLINE,
	ToolbarAlign,
	ToolbarCodeBlock,
	ToolbarElement,
	ToolbarList,
	ToolbarMark,
	ToolbarTable,
	ToolbarLink,
	ToolbarImage,
	useStoreEditorRef,
	useEventEditorId,
	getPlatePluginType,
	MARK_HIGHLIGHT,
	MARK_COLOR,
	MARK_BG_COLOR,
	ToolbarColorPicker,
	useEditorRef,
} from '@udecode/plate';
import { BsCodeSlash, BsImage } from 'react-icons/bs';
import {
	BiCodeBlock,
	BiBorderAll,
	BiBorderBottom,
	BiFontColor,
} from 'react-icons/bi';
import { ImSubscript, ImSuperscript } from 'react-icons/im';
import {
	AiOutlineHighlight,
	AiOutlineBorderLeft,
	AiOutlineBorderRight,
	AiOutlineBorderTop,
	AiOutlineAlignCenter,
	AiOutlineAlignRight,
	AiOutlineAlignLeft,
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineUnorderedList,
	AiOutlineOrderedList,
	AiOutlineStrikethrough,
} from 'react-icons/ai';
import { FaQuoteRight, FaUnderline, FaKeyboard } from 'react-icons/fa';
import { FiAlignJustify, FiLink } from 'react-icons/fi';
import {
	MdBorderClear,
	MdLooks3,
	MdLooksOne,
	MdLooksTwo,
	MdFontDownload,
} from 'react-icons/md';
import { useState } from 'react';
import ImageUploadAndSearch from './ImageButton';

export const ToolbarButtonsBasicElements = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_H1)}
				icon={<MdLooksOne />}
			/>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_H2)}
				icon={<MdLooksTwo />}
			/>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_H3)}
				icon={<MdLooks3 />}
			/>
			<ToolbarElement
				type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
				icon={<FaQuoteRight />}
			/>
			<ToolbarCodeBlock
				type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
				icon={<BiCodeBlock />}
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
				icon={<AiOutlineUnorderedList />}
			/>
			<ToolbarList
				type={getPlatePluginType(editor, ELEMENT_OL)}
				icon={<AiOutlineOrderedList />}
			/>
		</>
	);
};

export const ToolbarButtonsAlign = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	return (
		<>
			<ToolbarAlign icon={<AiOutlineAlignLeft />} />
			<ToolbarAlign
				type={getPlatePluginType(editor, ELEMENT_ALIGN_CENTER)}
				icon={<AiOutlineAlignCenter />}
			/>
			<ToolbarAlign
				type={getPlatePluginType(editor, ELEMENT_ALIGN_RIGHT)}
				icon={<AiOutlineAlignRight />}
			/>
			<ToolbarAlign
				type={getPlatePluginType(editor, ELEMENT_ALIGN_JUSTIFY)}
				icon={<FiAlignJustify />}
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
				icon={<AiOutlineBold />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_ITALIC)}
				icon={<AiOutlineItalic />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_UNDERLINE)}
				icon={<FaUnderline />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
				icon={<AiOutlineStrikethrough />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_CODE)}
				icon={<BsCodeSlash />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
				clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
				icon={<ImSuperscript />}
			/>
			<ToolbarMark
				type={getPlatePluginType(editor, MARK_SUBSCRIPT)}
				clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
				icon={<ImSubscript />}
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

export const ToolbarButtonsTable = () => (
	<>
		<ToolbarTable icon={<BiBorderAll />} transform={insertTable} />
		<ToolbarTable icon={<MdBorderClear />} transform={deleteTable} />
		<ToolbarTable icon={<BiBorderBottom />} transform={addRow} />
		<ToolbarTable icon={<AiOutlineBorderTop />} transform={deleteRow} />
		<ToolbarTable icon={<AiOutlineBorderLeft />} transform={addColumn} />
		<ToolbarTable icon={<AiOutlineBorderRight />} transform={deleteColumn} />
	</>
);

export const BallonToolbarMarks = () => {
	const editor = useStoreEditorRef(useEventEditorId('focus'));

	const arrow = false;
	const theme = 'dark';
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

export const ToolbarButtons = () => {
	const [data, setPhotosResponse] = useState({
		response: {
			results: [],
		},
	});
	const [visible, setVisible] = useState(false);

	const editor = useEditorRef();

	function handleOk() {
		console.log('Ok');
		setVisible(false);
		setPhotosResponse({
			response: {
				results: [],
			},
		});
	}

	function handleCancel() {
		console.log('Cancel');
		setVisible(false);
		setPhotosResponse({
			response: {
				results: [],
			},
		});
	}

	return (
		<>
			<Modal
				title='Basic Modal'
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				style={{ top: 20 }}
				width={800}
			>
				<ImageUploadAndSearch
					data={data}
					setPhotosResponse={setPhotosResponse}
					handleOk={handleOk}
				/>
			</Modal>
			<ToolbarButtonsBasicElements />
			<ToolbarButtonsList />
			<ToolbarButtonsBasicMarks />
			{/* <ToolbarColorPicker pluginKey={MARK_COLOR} icon={<BiFontColor />} />
		<ToolbarColorPicker pluginKey={MARK_BG_COLOR} icon={<MdFontDownload />} /> */}
			<ToolbarButtonsAlign />
			<ToolbarLink icon={<FiLink />} />
			<ToolbarButton onMouseDown={() => setVisible(true)} icon={<BsImage />} />
			<ToolbarButtonsTable />
			<EmbedButton editor={editor} />
		</>
	);
};
