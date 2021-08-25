import React from 'react';
import { Button, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useEditorRef } from '@udecode/plate-core';
import { insertMediaEmbed } from '@udecode/plate-media-embed';
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ToolbarButton } from '@udecode/plate';
import { BiVideo } from 'react-icons/bi';

const EmbedButton = ({ editor }) => {
	const [url, setUrl] = useState('');
	const [visible, setVisible] = useState(false);

	// const editor = useEditorRef();

	function handleSubmit(e) {
		let theUrl = url;
		if (theUrl.indexOf('youtube') >= 0 || theUrl.indexOf('youtu.be') >= 0) {
			if (theUrl.indexOf('=') >= 0) {
				insertMediaEmbed(editor, {
					url: `https://www.youtube.com/embed/${theUrl.split('=')[1]}`,
					pluginKey: ELEMENT_MEDIA_EMBED,
				});
			} else {
				insertMediaEmbed(editor, {
					url: `https://www.youtube.com/embed/${
						theUrl.split('/')[theUrl.split('/').length - 1]
					}`,
					pluginKey: ELEMENT_MEDIA_EMBED,
				});
			}
		} else if (theUrl.indexOf('vimeo') >= 0) {
			insertMediaEmbed(editor, {
				url: `https://player.vimeo.com/video/${
					theUrl.split('/')[theUrl.split('/').length - 1]
				}`,
				pluginKey: ELEMENT_MEDIA_EMBED,
			});
		}
		setVisible(false);
	}

	function handleCancel() {
		setVisible(false);
	}

	return (
		<>
			<ToolbarButton onMouseDown={() => setVisible(true)} icon={<BiVideo />} />
			<Modal
				title='Basic Modal'
				visible={visible}
				onOk={handleSubmit}
				onCancel={handleCancel}
				style={{ top: 20 }}
				width={800}
			>
				<Input
					onChange={(e) => setUrl(e.target.value)}
					placeholder='paste the url here'
				/>
				<Button onClick={handleSubmit}>Embed</Button>
			</Modal>
		</>
	);
};

export default EmbedButton;
