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

const ImageUpload = () => {
	const props = {
		name: 'file',
		multiple: false,
		beforeUpload: (file: any) => {
			if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
				message.error(`${file.name} is not a recognised image file`);
			}
			return file.type === 'image/png' || file.type === 'image/jpeg'
				? true
				: Upload.LIST_IGNORE;
		},
		onChange(info: any) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e: any) {
			console.log('Dropped files', e.dataTransfer.files);
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

const PhotoComp: React.FC<{ photo: Photo }> = ({ photo }) => {
	const { user, urls } = photo;

	return (
		<>
			<Image preview={false} className='img' src={urls.regular} />
		</>
	);
};

const ImageUploadAndSearch = ({ data, setPhotosResponse }: any) => {
	function onSearch(props: any) {
		console.log(props);
		api.search
			.getPhotos({ query: props, orientation: 'landscape' })
			.then((result: any) => {
				setPhotosResponse(result);
			})
			.catch(() => {
				console.log('something went wrong!');
			});
		console.log('Searched');
	}

	return (
		<>
			<ImageUpload />
			<h3 className='py-2'>Or</h3>
			<Search placeholder='input search text' onSearch={onSearch} />
			<div className='overflow-y-auto h-72'>
				<ul>
					{data.response.results.map((photo: Photo) => (
						<li key={photo.id} className='li'>
							<PhotoComp photo={photo} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default ImageUploadAndSearch;
