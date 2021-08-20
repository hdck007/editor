import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import 'prismjs';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
	type: 'paragraph';
	children: CustomText[];
};

export type LinkElement = {
	type: 'link';
	url: string;
	children: CustomText[];
};

export type BlockQuoteElement = {
	type: 'block-quote';
	children: CustomText[];
};

export type ListItems = {
	type: 'list-item';
	children: CustomText[];
};

export type ListElement = {
	type: 'numbered-list' | 'bulleted-list' | string;
	children: ListItems[];
};

export type HeadingElement = {
	type: 'heading';
	level: number;
	children: CustomText[];
};

export type CodeBlockElement = {
	type: 'codeblock';
};

export type CustomElement =
	| ParagraphElement
	| HeadingElement
	| LinkElement
	| ListElement
	| BlockQuoteElement
	| ListItems;

export type FormattedText = {
	text: string;
	bold?: boolean;
	code?: boolean;
	italic?: boolean;
	underlined?: boolean;
};

export type CustomText = FormattedText;

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
