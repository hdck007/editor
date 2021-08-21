import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { wrapLink } from '../Utility/utils';
import { isValidURL } from '../Utility/utils';

export const withLinks = (editor: Editor & ReactEditor) => {
	// Override the properties of the editor
	const { insertData, insertText, isInline } = editor;

	editor.isInline = (element: any) => {
		return element.type === 'link' ? true : isInline(element);
	};

	editor.insertText = (text: string) => {
		if (text && isValidURL(text)) {
			wrapLink(editor, text);
		} else {
			insertText(text);
		}
	};

	editor.insertData = (data) => {
		const text = data.getData('text/plain');

		if (text && isValidURL(text)) {
			wrapLink(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};
