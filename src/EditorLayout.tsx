import React from 'react';

export default function EditorLayout({ children }: any) {
	return (
		<div
			style={{
				width: '100vw',
				// height: '94vh',
			}}
		>
			<header
				className='h-10'
				style={{
					background: '#008080',
				}}
			></header>
			{children}
			<footer className='h-14 absolute bottom-0'></footer>
		</div>
	);
}
