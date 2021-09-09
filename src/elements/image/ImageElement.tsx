/* eslint-disable @next/next/no-img-element */
import React, {
	ChangeEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MediaEmbedUrlInput } from '@udecode/plate-media-embed-ui';
import TextareaAutosize from 'react-textarea-autosize';
import { setNodes } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-core';
import { Node, Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected } from 'slate-react';
import { ImageElementProps } from './ImageElement.types';
import { ImageHandle } from './ImageHandle';
import { getImageElementStyles } from '@udecode/plate';

// const plugins = [
// 	createHistoryPlugin(),
// 	createReactPlugin(),
// 	createSingleLinePlugin(),
// ];

export const ImageElement = (props: ImageElementProps) => {
	const {
		attributes,
		children,
		element,
		nodeProps,
		caption = {},
		resizableProps = {
			minWidth: 92,
		},
		align = 'center',
	} = props;

	const { placeholder = 'Write a caption...' } = caption;

	const {
		url,
		width: nodeWidth = '100%',
		caption: nodeCaption = [{ children: [{ text: '' }] }],
	} = element;
	const focused = useFocused();
	const selected = useSelected();
	const editor = useEditorRef();
	const [width, setWidth] = useState(nodeWidth);

	// const [captionId] = useState(nanoid());

	useEffect(() => {
		setWidth(nodeWidth);
	}, [nodeWidth]);

	const styles = getImageElementStyles({ ...props, align, focused, selected });

	const onChangeCaption: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
		(e) => {
			const path = ReactEditor.findPath(editor as ReactEditor, element);
			setNodes(editor, { caption: [{ text: e.target.value }] }, { at: path });
		},
		[editor, element]
	);

	const captionString = useMemo(() => {
		return Node.string(nodeCaption[0]) || '';
	}, [nodeCaption]);

	// console.log(url);

	return (
		<div
			{...attributes}
			// @ts-ignore
			css={styles.root.css}
			className={styles.root.className}
		>
			<figure
				contentEditable={false}
				// @ts-ignore
				css={styles.figure?.css}
				// @ts-ignore
				className={`group ${styles.figure?.className}`}
			>
				<img
					data-testid='ImageElementImage'
					// @ts-ignore
					css={styles.img?.css}
					className={styles.img?.className}
					src={url}
					alt={captionString}
					{...nodeProps}
				/>

				{/* !caption.disabled && (captionString.length || selected) */}
				{true && (
					<figcaption
						style={{ width }}
					>
						<TextareaAutosize
							style={{
								outline: 'none',
								width: '100%',
								textAlign: 'center',
							}}
							value={nodeCaption[0].text}
							placeholder={placeholder}
							onChange={onChangeCaption}
						/>
					</figcaption>
				)}
			</figure>
			{children}
		</div>
	);
};
