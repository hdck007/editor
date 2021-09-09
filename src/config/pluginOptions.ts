import { any } from 'prop-types';
import {
	ELEMENT_BLOCKQUOTE,
	ELEMENT_CODE_BLOCK,
	ELEMENT_PARAGRAPH,
	ELEMENT_TD,
	ELEMENT_TODO_LI,
	ELEMENT_IMAGE,
	ExitBreakPluginOptions,
	createPlateOptions,
	isBlockAboveEmpty,
	isSelectionAtBlockStart,
	KEYS_HEADING,
	WithAutoformatOptions,
	MentionNodeData,
	ResetBlockTypePluginOptions,
	SoftBreakPluginOptions,
	PlatePlugin,
	getRenderElement,
	SPEditor,
} from '@udecode/plate';
import { MENTIONABLES } from './mentionables';
import { autoformatRules } from './autoformat/autoformatRules';
import { BaseEditor } from 'slate';

export const options = createPlateOptions();

export const optionsMentionPlugin = {
	mentionables: MENTIONABLES,
	maxSuggestions: 10,
	insertSpaceAfterMention: false,
	trigger: '@',
	mentionableFilter: (s: string) => (mentionable: MentionNodeData) =>
		mentionable.email.toLowerCase().includes(s.toLowerCase()) ||
		mentionable.name.toLowerCase().includes(s.toLowerCase()),
	mentionableSearchPattern: '\\S*',
};

const resetBlockTypesCommonRule = {
	types: [options[ELEMENT_BLOCKQUOTE].type, options[ELEMENT_TODO_LI].type],
	defaultType: options[ELEMENT_PARAGRAPH].type,
};

export const optionsResetBlockTypePlugin: ResetBlockTypePluginOptions = {
	rules: [
		{
			...resetBlockTypesCommonRule,
			hotkey: 'Enter',
			predicate: isBlockAboveEmpty,
		},
		{
			...resetBlockTypesCommonRule,
			hotkey: 'Backspace',
			predicate: isSelectionAtBlockStart,
		},
	],
};

export const optionsSoftBreakPlugin: SoftBreakPluginOptions = {
	rules: [
		{ hotkey: 'shift+enter' },
		{
			hotkey: 'enter',
			query: {
				allow: [
					options[ELEMENT_CODE_BLOCK].type,
					options[ELEMENT_BLOCKQUOTE].type,
					options[ELEMENT_TD].type,
				],
			},
		},
	],
};

export const optionsExitBreakPlugin: ExitBreakPluginOptions = {
	rules: [
		{
			hotkey: 'mod+enter',
		},
		{
			hotkey: 'mod+shift+enter',
			before: true,
		},
		{
			hotkey: 'enter',
			query: {
				start: true,
				end: true,
				allow: KEYS_HEADING,
			},
		},
		{
			hotkey: 'enter',
			query: {
				allow: [options[ELEMENT_IMAGE].type],
			},
		},
		{
			hotkey: 'enter',
			before: true,
			query: {
				start: true,
				allow: [options[ELEMENT_PARAGRAPH].type],
			},
		},
	],
};

export const optionsAutoformat: WithAutoformatOptions = {
	rules: autoformatRules,
};

export const createBasicPlugin = (): PlatePlugin => ({
	pluginKeys: 'BASIC_PLUGIN',
	onKeyDown: () => function () {},
	renderElement: getRenderElement(ELEMENT_TD),
});

export const editableProps: any = {
	placeholder: 'Enter some rich text…',
	spellCheck: false,
	padding: '0 30px',
	// onMouseDown: (event: any) => {
	// 	console.log('Happens');
	// 	console.log({ event });
	// },
	// onKeyUp: debounce(storeInLocal, 300),
	onBlur: (editor: BaseEditor & { lastSelection: any }) => {
		editor.lastSelection = editor.selection;
	},
};
