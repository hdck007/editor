/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createSingleLinePlugin } from '@udecode/plate-break';
import { setNodes } from '@udecode/plate-common';
import {
	createHistoryPlugin,
	createReactPlugin,
	Plate,
	useEditorRef,
} from '@udecode/plate-core';
import { Node } from 'slate';
import { ReactEditor, useFocused, useSelected } from 'slate-react';
import { getImageElementStyles } from '@udecode/plate-image-ui';
import { ImageElementProps } from './ImageElement.types';

const plugins = [
	createHistoryPlugin(),
	createReactPlugin(),
	createSingleLinePlugin(),
];

export const ImageElement = (props: ImageElementProps) => {
	const {
		attributes,
		children,
		element,
		nodeProps,
		disableCaption,
		captionPlaceholder = 'Write a caption...',
	} = props;

	const {
		url,
		width: nodeWidth = '100%',
		caption = [{ children: [{ text: '' }] }],
		id,
	} = element;
	const focused = useFocused();
	const selected = useSelected();
	const editor = useEditorRef();
	const [width, setWidth] = useState(nodeWidth);

	useEffect(() => {
		setWidth(nodeWidth);
	}, [nodeWidth]);

	const styles: any = getImageElementStyles({ ...props, focused, selected });

	const onChangeCaption = useCallback(
		(e: any[]) => {
			const path = ReactEditor.findPath(editor as ReactEditor, element);
			setNodes(editor, { caption: e }, { at: path });
		},
		[editor, element]
	);

	const captionString = useMemo(() => {
		return Node.string(caption?.[0]) || '';
	}, [caption]);

	return (
		<div
			{...attributes}
			// @ts-ignore
			css={styles.root.css}
			className={styles.root.className}
		>
			<div contentEditable={false}>
				<figure
					// @ts-ignore
					css={styles.figure?.css}
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
					{!disableCaption && (caption.length || selected) && (
						<figcaption
							style={{ width }}
							// @ts-ignore
							css={styles.figureCaption?.css}
							className={styles.figureCaption?.className}
						>
							<div
								// @ts-ignore
								css={styles.captionInput?.css}
							>
								<Plate
									id={`${id}-image-caption`}
									plugins={plugins}
									initialValue={caption}
									value={caption}
									editableProps={{
										placeholder: captionPlaceholder,
										className: styles.captionInput?.className,
									}}
									onChange={onChangeCaption}
								/>
							</div>
						</figcaption>
					)}
				</figure>
			</div>
			{children}
		</div>
	);
};
