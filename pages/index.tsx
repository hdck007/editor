import { NextPage } from 'next';
import { useState } from 'react';
import EditorLayout from '../src/EditorLayout';
import Plugins from '../src/RichEditor';
import MDEditor from '../src/MDEditor';

const RichTextPage: NextPage = () => {
	const [isMd, setIsMd] = useState(false);

	return (
		<EditorLayout>
			{true ? <Plugins setIsMd={setIsMd} /> : <MDEditor setIsMd={setIsMd} />}
		</EditorLayout>
	);
};

export default RichTextPage;
