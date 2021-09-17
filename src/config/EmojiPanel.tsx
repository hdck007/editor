import React, { useState } from 'react';
import { ToolbarButton, useEditorRef } from '@udecode/plate';
import EmojiIcon from '../../public/emoji.svg';

if (typeof window !== 'undefined') {
	require('emoji-picker-element');
}

const Picker = () => {
	const ref: any = React.useRef(null);
	const editor = useEditorRef();

	React.useEffect(() => {
		ref.current.addEventListener('emoji-click', (event: any) => {
			editor.insertText(event.detail.unicode);
		});
		ref.current.skinToneEmoji = '👍';
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return React.createElement('emoji-picker', {
		ref,
		class: 'light z-10',
		id: 'my-search',
	});
};

export default function EmojiButton() {
	const [visible, setVisible] = useState(false);

	function handleClick() {
		setVisible((prev) => !prev);
	}

	return (
		<div>
			<ToolbarButton icon={<EmojiIcon />} onMouseDown={handleClick} />
			{visible ? (
				<div className='absolute'>
					<Picker />
				</div>
			) : null}
		</div>
	);
}
