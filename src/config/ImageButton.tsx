import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { Input } from 'antd';
import { Image } from 'antd';
import { createApi } from 'unsplash-js';
import { Button } from 'antd/lib/radio';
import { InboxOutlined } from '@ant-design/icons';
import { SetStateAction } from 'react';
import { any } from 'prop-types';
import { useEffect } from 'react';
import { useEditor } from 'slate-react';
import { Modal } from 'antd';
import { BsImage } from 'react-icons/bs';
import { plugins } from '../RichEditor';
import {
	Serialize,
	deserializeHTMLToDocumentFragment,
	ELEMENT_ALIGN_CENTER,
	ELEMENT_IMAGE,
	ELEMENT_MEDIA_EMBED,
	ELEMENT_PARAGRAPH,
	insertImage,
	insertMediaEmbed,
	insertNodes,
	isEnd,
	ToolbarButton,
	useEditorRef,
} from '@udecode/plate';
import { FiImage } from 'react-icons/fi';

const { Dragger } = Upload;

const api = createApi({
	// Don't forget to set your access token here!
	// See https://unsplash.com/developers
	accessKey: 'ggSD8p6lKKwnhzYf4lG-E6_kz8-NmEGv0U8f1Dvgf-4',
});

const { Search } = Input;

type Photo = {
	id: number;
	width: number;
	height: number;
	urls: { large: string; regular: string; raw: string; small: string };
	color: string | null;
	user: {
		username: string;
		name: string;
	};
};

const PhotoComp: React.FC<{
	photo: Photo;
	handleOk: Function;
	location: any;
	setNode: any;
}> = ({ photo, handleOk, location, setNode }) => {
	const { user, urls } = photo;
	const editor = useEditorRef();

	function handleClick() {
		// Inserts a node with image and paragraph as child
		insertNodes(
			editor,
			[
				{
					type: ELEMENT_IMAGE,
					url: urls.regular,
					children: [],
				},
			],
			{
				at: location ? location.anchor : [0, 0],
			}
		);
		handleOk();
		setNode(null);
	}

	return (
		<>
			<Image
				preview={false}
				className='img'
				src={urls.regular}
				onClick={handleClick}
			/>
		</>
	);
};

const ImageSearch = ({ editor, location, setNode }: any) => {
	const [data, setPhotosResponse] = useState({
		response: {
			results: [],
		},
	});
	const [visible, setVisible] = useState(false);

	function handleOk() {
		setVisible(false);
		setPhotosResponse({
			response: {
				results: [],
			},
		});
	}

	function handleCancel() {
		setVisible(false);
		setPhotosResponse({
			response: {
				results: [],
			},
		});
	}

	function onSearch(props: any) {
		api.search
			.getPhotos({ query: props })
			.then((result: any) => {
				setPhotosResponse(result);
			})
			.catch(() => {
				console.log('something went wrong!');
			});
	}

	return (
		<>
			<button
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					width: '130px',
				}}
				onMouseDown={() => setVisible(true)}
			>
				<span>{'Search unsplash'}</span>
				<span>
					<FiImage />
				</span>
			</button>
			<Modal
				title='Add Image'
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				style={{ top: 20 }}
				width={800}
			>
				<Search
					placeholder='input search text'
					onSearch={onSearch}
					allowClear={true}
				/>
				<div className='overflow-y-auto h-72'>
					<ul>
						{data.response.results.map((photo: Photo) => (
							<li key={photo.id} className='li'>
								<PhotoComp
									photo={photo}
									handleOk={handleOk}
									location={location}
									setNode={setNode}
								/>
							</li>
						))}
					</ul>
				</div>
			</Modal>
		</>
	);
};

export default ImageSearch;
