import { NextPage } from 'next';
import { useState } from 'react';
import EditorLayout from '../src/EditorLayout';
import Plugins from '../src/RichEditor';
import MDEditor from '../src/MDEditor';

const RichTextPage: NextPage = () => {
	const [isMd, setIsMd] = useState(true);

	return (
		<EditorLayout>
			{isMd ? <MDEditor setIsMd={setIsMd} /> : <Plugins setIsMd={setIsMd} />}
		</EditorLayout>
	);
};

export default RichTextPage;
