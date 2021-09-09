import React from 'react';
import { Button, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useEditorRef } from '@udecode/plate-core';
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import {
	insertNodes,
} from '@udecode/plate';
import { BiVideo } from 'react-icons/bi';

const EmbedButton = ({ editor, location, setNode }: any) => {
	const [url, setUrl] = useState('');
	const [visible, setVisible] = useState(false);

	function handleSubmit(e: any) {
		let theUrl = url;
		if (theUrl.indexOf('youtube') >= 0 || theUrl.indexOf('youtu.be') >= 0) {
			if (theUrl.indexOf('=') >= 0) {
				insertNodes(
					editor,
					[
						{
							isInline: true,
							type: ELEMENT_MEDIA_EMBED,
							url: `https://www.youtube.com/embed/${theUrl.split('=')[1]}`,
							children: [{ text: '' }],
						},
						{
							text: '',
						},
					],
					{
						at: location ? location.anchor : [0, 0],
					}
				);
			} else {
				insertNodes(
					editor,
					[
						{
							type: ELEMENT_MEDIA_EMBED,
							url: `https://www.youtube.com/embed/${
								theUrl.split('/')[theUrl.split('/').length - 1]
							}`,
							children: [{ text: '' }],
						},
						{
							text: '',
						},
					],
					{
						at: location ? location.anchor : [0, 0],
					}
				);
			}
		} else if (theUrl.indexOf('vimeo') >= 0) {
			insertNodes(
				editor,
				[
					{
						type: ELEMENT_MEDIA_EMBED,
						url: `https://player.vimeo.com/video/${
							theUrl.split('/')[theUrl.split('/').length - 1]
						}`,
						children: [{ text: '' }],
					},
					{
						text: '',
					},
				],
				{
					at: location ? location.anchor : [0, 0],
				}
			);
		}
		setNode(null);
		setVisible(false);
	}

	function handleCancel() {
		setVisible(false);
	}

	return (
		<>
			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					width: '120px',
				}}
				onMouseDown={() => setVisible(true)}
			>
				<span>{'Embed a video'}</span>
				<span>
					<BiVideo />
				</span>
			</button>
			<Modal
				title='Embed a Video'
				visible={visible}
				onOk={(e) => handleSubmit(e)}
				onCancel={handleCancel}
				style={{ top: 20 }}
				width={800}
			>
				<Input
					onChange={(e) => setUrl(e.target.value)}
					placeholder='paste the url here'
				/>
			</Modal>
		</>
	);
};

export default EmbedButton;
