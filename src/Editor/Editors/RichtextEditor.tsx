import React, { useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate, ReactEditor } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../Components/editorComponents';
import { Element } from '../renderers/ElementRenderer';
import { Leaf } from '../renderers/LeafRenderer';
import { withLinks } from '../Plugins/Links';
import { toggleMark } from '../Utility/utils';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';

const HOTKEYS: any = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
};

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

const RichTextEditor = ({
	isMarkdown,
	setIsMarkdown,
	value,
	setValue,
}: any) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(
		() => withHistory(withLinks(withReact(createEditor() as CustomEditor))),
		[]
	);

	return (
		<div className='mx-auto my-9 w-5/6 h-3/4 md:w-6/6 px-5 pb-4 overflow-y-auto relative'>
			<Slate
				editor={editor}
				value={value}
				onChange={(value) => setValue(value)}
			>
				<div className='w-full'>
					<Toolbar
						isMarkdown={isMarkdown}
						setIsMarkdown={setIsMarkdown}
						className='sticky'
					/>
					<Editable
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder='Enter some rich text…'
						spellCheck
						autoFocus
						onKeyDown={(event) => {
							for (const hotkey in HOTKEYS) {
								if (isHotkey(hotkey, event as any)) {
									event.preventDefault();
									const mark = HOTKEYS[hotkey];
									toggleMark(editor, mark);
								}
							}
						}}
					/>
				</div>
			</Slate>
		</div>
	);
};

export default RichTextEditor;
