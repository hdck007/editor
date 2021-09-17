import {
	AutoformatRule,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_CODE_BLOCK,
	ELEMENT_DEFAULT,
	ELEMENT_H1,
	ELEMENT_H2,
	getPlatePluginType,
	insertEmptyCodeBlock,
	SPEditor,
} from '@udecode/plate';
import { formatText, preFormat } from './autoformatUtils';

export const autoformatBlocks: AutoformatRule[] = [
	{
		mode: 'block',
		type: ELEMENT_H1,
		match: '# ',
	},
	{
		mode: 'block',
		type: ELEMENT_H2,
		match: '## ',
	},
	{
		mode: 'block',
		type: ELEMENT_BLOCKQUOTE,
		match: '> ',
	},
	{
		mode: 'block',
		type: ELEMENT_CODE_BLOCK,
		match: '```',
		triggerAtBlockStart: false,
		preFormat,
		format: (editor) => {
			insertEmptyCodeBlock(editor as SPEditor, {
				defaultType: getPlatePluginType(editor as SPEditor, ELEMENT_DEFAULT),
				insertNodesOptions: { select: true },
			});
		},
	},
];
