import React, { useState } from 'react';
import { ToolbarButton, useEditorRef } from '@udecode/plate';

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
	}, []);

	return React.createElement('emoji-picker', { ref, class: 'light' });
};

export default function EmojiButton() {
	const [visible, setVisible] = useState(false);

	function handleClick() {
		setVisible((prev) => !prev);
	}

	return (
		<div className='absolute right-5'>
			<ToolbarButton
				className='absolute right-0'
				icon={'😀'}
				onMouseDown={handleClick}
			/>
			<div className='absolute'>{visible ? <Picker /> : null}</div>
		</div>
	);
}
