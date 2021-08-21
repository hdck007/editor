import { NextPage } from 'next';
import EditorLayout from '../src/EditorLayout';
import Plugins from '../src/RichEditor';

const RichTextPage: NextPage = () => {
	return (
		<EditorLayout>
			<Plugins />;
		</EditorLayout>
	);
};

export default RichTextPage;
