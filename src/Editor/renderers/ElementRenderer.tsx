export const Element = ({ attributes, children, element }) => {
	// console.log({ attributes, children, element });

	switch (element.type) {
		case 'link':
			return (
				<a className='text-blue-500' {...attributes} href={element.url}>
					{children}
				</a>
			);
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>;
		case 'bulleted-list':
			return (
				<ul className='list-disc' {...attributes}>
					{children}
				</ul>
			);
		case 'list-item':
			return <li {...attributes}>{children}</li>;
		case 'numbered-list':
			return (
				<ol className='list-decimal' {...attributes}>
					{children}
				</ol>
			);
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>;
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>;
		case 'heading-one':
			return (
				<h1 className='text-3xl' {...attributes}>
					{children}
				</h1>
			);
		case 'heading-two':
			return (
				<h2 className='text-2xl' {...attributes}>
					{children}
				</h2>
			);
		case 'heading-three':
			return (
				<h3 className='text-xl' {...attributes}>
					{children}
				</h3>
			);
		case 'heading-four':
			return (
				<h4 className='text-lg' {...attributes}>
					{children}
				</h4>
			);
		case 'heading-five':
			return (
				<h5 className='text-base' {...attributes}>
					{children}
				</h5>
			);
		case 'heading-six':
			return <h6 {...attributes}>{children}</h6>;
		default:
			return <p {...attributes}>{children}</p>;
	}
};
