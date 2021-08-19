import React, { useState } from 'react';
import { NextPage } from 'next';
import EditorLayout from '../src/Editor/Layout/editorLayout';
import RichTextEditor from '../src/Editor/Editors/RichtextEditor';
import MarkDownEditor from '../src/Editor/Editors/MarkdownEditor';
import { Descendant } from 'slate';

const RichTextPage: NextPage = () => {
	const [isMarkdown, setIsMarkdown] = useState(false);
	const [value, setValue] = useState<Descendant[]>(initialValue);

	return (
		<EditorLayout>
			{true ? (
				<MarkDownEditor
					isMarkdown={isMarkdown}
					setIsMarkdown={setIsMarkdown}
					value={value}
					setValue={setValue}
				/>
			) : (
				<RichTextEditor
					isMarkdown={isMarkdown}
					setIsMarkdown={setIsMarkdown}
					value={value}
					setValue={setValue}
				/>
			)}
		</EditorLayout>
	);
};

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: 'This is editable ' }],
	},
];

export default RichTextPage;
