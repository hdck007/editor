import React, { useCallback, useMemo } from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import {
	Editor,
	Transforms,
	Range,
	Point,
	createEditor,
	Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../Components/editorComponents';
import { Element } from '../renderers/ElementRenderer';
import { Leaf } from '../renderers/LeafRenderer';
import { withLinks } from '../Plugins/Links';
import { CustomEditor } from '../Types/EditorTypes';

const MarkDownEditor = ({
	isMarkdown,
	setIsMarkdown,
	value,
	setValue,
}: any) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(
		() =>
			withShortcuts(
				withLinks(withReact(withHistory(createEditor() as CustomEditor)))
			),
		[]
	);
	return (
		<div className='mx-auto my-9 w-5/6 h-3/4 md:w-6/6 px-5 pb-4 overflow-y-auto relative'>
			<Slate
				editor={editor as ReactEditor}
				value={value}
				onChange={(value) => setValue(value)}
			>
				<div>
					<Toolbar
						className='sticky'
						isMarkdown={isMarkdown}
						setIsMarkdown={setIsMarkdown}
					/>
					<Editable
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder='Write some markdown...'
						spellCheck
						autoFocus
					/>
				</div>
			</Slate>
		</div>
	);
};


export default MarkDownEditor;
