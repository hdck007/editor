import { useEditorRef } from '@udecode/plate-core';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PopupMenu from './PopupMenu';

function SideToolBar({ node, setNode }: any) {
	const [visible, setVisible] = useState(false);
	const [location, setLocation] = useState(null);
	const editor = useEditorRef();

	useEffect(() => {
		// @ts-ignore
		setLocation(editor.selection);
		return () => {
			setVisible(false);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [node]);

	if (!node) {
		return null;
	}
	return ReactDOM.createPortal(
		<PopupMenu
			setVisible={setVisible}
			visible={visible}
			location={location}
			setNode={setNode}
		/>,
		node
	);
}

export default SideToolBar;
