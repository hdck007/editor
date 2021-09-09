import React from 'react';

export default function EditorLayout({ children }: any) {
	return (
		<div
			style={{
				width: '100vw',
				position: 'relative',
			}}
		>
			<header className='h-10'></header>
			<div
				style={{
					minHeight: '80vh',
				}}
			>
				{children}
			</div>
			<footer className='h-14 bg-black absolute bottom-0 z-10'></footer>
		</div>
	);
}
