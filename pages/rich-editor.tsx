import { NextPage } from 'next';
import EditorLayout from '../src/Editor/Layout/editorLayout';
import Plugins from '../src/NewEditor/RichEditor';

const RichTextPage: NextPage = () => {
	return (
		<EditorLayout>
			<Plugins />;
		</EditorLayout>
	);
};

const initialValue: any = [
	{
		type: 'paragraph',
		children: [{ text: 'This is editable ' }],
	},
];

export default RichTextPage;
