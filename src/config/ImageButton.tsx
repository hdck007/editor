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
import {
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

const ImageUpload: React.FC<{ handleOk: Function; location: any }> = ({
	handleOk,
	location,
}) => {
	const editor = useEditorRef();

	const fileToBuffer = (file: any) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event: any) => {
				resolve(event.target.result);
			};
			reader.readAsDataURL(file);
		});

	const props = {
		name: 'file',
		multiple: false,
		beforeUpload: (file: any) => {
			if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
				message.error(`${file.name} is not a recognised image file`);
			}
			fileToBuffer(file).then((file: any) => {
				insertNodes(
					editor,
					[
						{
							type: ELEMENT_IMAGE,
							url: file,
							children: [
								{
									text: 'Caption',
								},
							],
						},
						{
							type: ELEMENT_ALIGN_CENTER,
							children: [
								{
									text: 'Enter the caption... press ctrl+enter to escape',
									isVoid: true,
								},
							],
						},
					],
					{
						at: location ? location.anchor : [0, 0],
					}
				);
				// insertImage(editor, file));
			});
			return false;
		},
		onChange(info: any) {
			const { status } = info.file;
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
				// info.file.arrayBuffer().then((buffer: any) => console.log(buffer));
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
			handleOk();
		},
	};

	return (
		<Dragger {...props} maxCount={1}>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined />
			</p>
			<p className='ant-upload-text'>
				Click or drag file to this area to upload
			</p>
		</Dragger>
	);
};

const PhotoComp: React.FC<{ photo: Photo; handleOk: Function; location: any }> =
	({ photo, handleOk, location }) => {
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
						children: [
							{
								text: 'Caption',
							},
						],
					},
					{
						type: ELEMENT_ALIGN_CENTER,
						children: [
							{
								text: 'Hello',
							},
						],
					},
				],
				{
					at: location ? location.anchor : [0, 0],
				}
			);
			handleOk();
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

const ImageUploadAndSearch = ({ editor }: any) => {
	const [data, setPhotosResponse] = useState({
		response: {
			results: [],
		},
	});
	const [visible, setVisible] = useState(false);
	const [location, setLocation] = useState(null);

	useEffect(() => {
		setLocation(editor.selection);
	}, [visible]);

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
			<ToolbarButton onMouseDown={() => setVisible(true)} icon={<BsImage />} />
			<Modal
				title='Basic Modal'
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				style={{ top: 20 }}
				width={800}
			>
				<ImageUpload handleOk={handleOk} location={location} />
				<h3 className='py-2'>Or</h3>
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
								/>
							</li>
						))}
					</ul>
				</div>
			</Modal>
		</>
	);
};

export default ImageUploadAndSearch;
