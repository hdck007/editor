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

const SHORTCUTS: any = {
	'*': 'list-item',
	'-': 'list-item',
	'+': 'list-item',
	'>': 'block-quote',
	'#': 'heading-one',
	'##': 'heading-two',
};

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

const withShortcuts = (editor: CustomEditor) => {
	const { deleteBackward, insertText } = editor;

	editor.insertText = (text) => {
		const { selection } = editor;

		if (text === ' ' && selection && Range.isCollapsed(selection)) {
			const { anchor } = selection;
			const block = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n),
			});
			const path = block ? block[1] : [];
			const start = Editor.start(editor, path);
			const range = { anchor, focus: start };
			const beforeText = Editor.string(editor, range);
			const type = SHORTCUTS[beforeText];

			if (type) {
				Transforms.select(editor, range);
				Transforms.delete(editor);
				const newProperties: Partial<SlateElement> = {
					type,
				};
				Transforms.setNodes(editor, newProperties, {
					match: (n) => Editor.isBlock(editor, n),
				});

				if (type === 'list-item') {
					const list: any = {
						type: 'bulleted-list',
						children: [],
					};
					Transforms.wrapNodes(editor, list, {
						match: (n) =>
							!Editor.isEditor(n) &&
							SlateElement.isElement(n) &&
							n.type === 'list-item',
					});
				}

				return;
			}
		}

		insertText(text);
	};

	editor.deleteBackward = (...args) => {
		const { selection } = editor;

		if (selection && Range.isCollapsed(selection)) {
			const match = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n),
			});

			if (match) {
				const [block, path] = match;
				const start = Editor.start(editor, path);

				if (
					!Editor.isEditor(block) &&
					SlateElement.isElement(block) &&
					block.type !== 'paragraph' &&
					Point.equals(selection.anchor, start)
				) {
					const newProperties: Partial<SlateElement> = {
						type: 'paragraph',
					};
					Transforms.setNodes(editor, newProperties);

					if (block.type === 'list-item') {
						Transforms.unwrapNodes(editor, {
							match: (n) =>
								!Editor.isEditor(n) &&
								SlateElement.isElement(n) &&
								n.type === 'bulleted-list',
							split: true,
						});
					}

					return;
				}
			}

			deleteBackward(...args);
		}
	};

	return editor;
};

export default MarkDownEditor;
