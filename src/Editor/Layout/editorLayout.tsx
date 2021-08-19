import React from 'react';

export default function EditorLayout({ children }) {
	return (
		<div className='w-screen bg-gray-100 h-screen relative overflow-hidden'>
			<header
				className='h-14'
				style={{
					background: '#008080',
				}}
			></header>
			{children}
			<footer className='h-14 bg-black'></footer>
		</div>
	);
}
