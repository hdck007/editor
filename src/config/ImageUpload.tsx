import React from 'react';
import { Button, Upload } from 'antd';
import { insertNodes } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-core';
import { ELEMENT_IMAGE } from '@udecode/plate-image';
import { message } from 'antd';
import { BsUpload } from 'react-icons/bs';

const ImageUpload: React.FC<{ location: any; setNode: any }> = ({
	location,
	setNode,
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
			fileToBuffer(file).then((file: any) => {
				insertNodes(
					editor,
					[
						{
							type: ELEMENT_IMAGE,
							url: file,
							children: [],
						},
					],
					{
						at: location ? location.anchor : [0, 0],
					}
				);
				setNode(null);
				// insertImage(editor, file));
			});
			return false;
		},
		onChange(info: any) {
			const { status } = info.file;
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

	return (
		<Upload
			{...props}
			maxCount={1}
			showUploadList={false}
			className="upload-btn-custom"
		>
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<span>Upload Image</span>&nbsp;&nbsp;
				<span>
					<BsUpload />
				</span>
			</span>
		</Upload>
	);
};

export default ImageUpload;
