import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { convertHtmlToNode } from '../utils/htmlToNode/deserializePrev';
import { convertNodeToHtml } from '../utils/toHtml/htmlSerialize';

let data: any = null;
if (typeof window !== 'undefined') {
	data = localStorage.getItem('content');
}

const RichTextPage: NextPage = () => {
	const ref = useRef(null);

	useEffect(() => {
		let parent = document.createElement('div');
		parent.classList.add('w-full');
		convertNodeToHtml(parent, JSON.parse(data));
		// @ts-ignore
		ref.current.appendChild(parent);
	}, []);

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
