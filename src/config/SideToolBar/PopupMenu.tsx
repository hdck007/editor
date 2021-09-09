/* eslint-disable react/jsx-key */
import React from 'react';
import EmbedButton from '../InsertMediaButton';
import { useEditorRef } from '@udecode/plate-core';
import ImageSearch from '../ImageButton';
import AddIcon from '../../../public/Add.svg';
import ImageUpload from '../ImageUpload';

function SideBarButton({ children }: any) {
	return (
		<button
			style={{
				border: '1px solid gray',
				borderRadius: '15px',
				padding: '2px',
				paddingInline: '5px',
				margin: '5px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				background: 'none',
			}}
		>
			{children}
		</button>
	);
}

function PopupMenu({ setVisible, visible, location, setNode }: any) {
	const editor = useEditorRef();

	const buttons = [
		<ImageSearch editor={editor} location={location} setNode={setNode} />,
		<ImageUpload location={location} setNode={setNode} />,
		<EmbedButton editor={editor} location={location} setNode={setNode} />,
	];

	return (
		<span
			style={{
				position: 'absolute',
				bottom: 0,
				top: 0,
				left: '-50px',
				transition: 'all 1s ease-in-out',
				display: 'flex',
				alignItems: 'center',
			}}
			contentEditable={false}
		>
			<button>
				<AddIcon
					style={{
						fontSize: '28px',
						transform: visible ? 'rotateZ(45deg) scale(1.3)' : 'rotateZ(0deg)',
						transition: 'all 0.3s ease-in-out',
					}}
					onMouseDown={() => {
						setVisible((prev: boolean) => !prev);
					}}
				/>
			</button>
			{visible && (
				<div
					style={{
						width: '600px',
						height: '20px',
						position: 'relative',
						left: '10px',
						transition: 'all 1s ease',
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
						background: 'white',
					}}
				>
					{buttons.map((element, index) => (
						<SideBarButton>{element}</SideBarButton>
					))}
				</div>
			)}
		</span>
	);
}

export default PopupMenu;
