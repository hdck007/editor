import { NextPage } from 'next';
import EditorLayout from '../src/EditorLayout';
import MDEditor from '../src/MDEditor';

const RichTextPage: NextPage = () => {
	return (
		<EditorLayout>
			<MDEditor />;
		</EditorLayout>
	);
};

export default RichTextPage;
