import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { convertHtmlToNode } from '../utils/htmlToNode/deserializePrev';
import { convertNodeToHtml } from '../utils/toHtml/htmlSerialize';

const RichTextPage: NextPage = () => {
	const ref = useRef(null);

	useEffect(() => {
    let data = localStorage.getItem('content');
		let parent = document.createElement('div');
		parent.classList.add('w-full');
		convertNodeToHtml(parent, JSON.parse(data as string));
    console.log('This is returned from the editor', JSON.parse(data as string));
		let temp = document.createElement('div');
    console.log('This is converted dom', parent)
		localStorage.setItem('dom', temp.innerHTML);
		console.log('Converted back from the html', convertHtmlToNode(parent));
		// @ts-ignore
		ref.current.appendChild(parent)
	}, [ref]);

	return (
		<>
			<br />
			<br />
			<br />
			<div
				className='w-1/2 m-auto'
				ref={ref}
				style={{
					marginTop: '50px',
				}}
			></div>
			<br />
			<br />
			<br />
		</>
	);
};

export default RichTextPage;
