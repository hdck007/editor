import { Transforms, Editor, Range, Element as SlateElement } from 'slate';
import { CustomEditor, CustomElement } from '../Types/EditorTypes';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function isValidURL(str: string) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // fragment locator
	return !!pattern.test(str);
}

export const insertLink = (editor: CustomEditor, url: string) => {
	if (editor.selection) {
		wrapLink(editor, url);
	}
};

export const isLinkActive = (editor: CustomEditor) => {
	const link: any = Editor.nodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
	});
	return !!link[0];
};

export const unwrapLink = (editor: CustomEditor) => {
	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
	});
};

export const wrapLink = (editor: CustomEditor, url: string) => {
	if (isLinkActive(editor)) {
		unwrapLink(editor);
	}

	const { selection } = editor;
	const isCollapsed = selection && Range.isCollapsed(selection);
	const link: any = {
		type: 'link',
		url,
		children: isCollapsed ? [{ text: url }] : [],
	};

	if (isCollapsed) {
		Transforms.insertNodes(editor, link);
	} else {
		Transforms.wrapNodes(editor, link, { split: true });
		Transforms.collapse(editor, { edge: 'end' });
	}
};

export const toggleBlock = (editor: CustomEditor, format: string) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes(n.type),
		split: true,
	});
	const newProperties: Partial<SlateElement> = {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format,
	};
	Transforms.setNodes(editor, newProperties);

	if (!isActive && isList) {
		const block: CustomElement = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

// removes or adds a mark based on the current condition
export const toggleMark = (editor: CustomEditor, format: string) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

export const isBlockActive = (editor: CustomEditor, format: string) => {
	const [match]: any = Editor.nodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
	});

	return !!match;
};

// It returns whether a mark at the pointer or selection present
// eg if we have bold text then this would give true for the bold mark
export const isMarkActive = (editor: CustomEditor, format: string) => {
	// Get the marks that are already applied
	// marks {mark: boolean}
	const marks: any = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};
