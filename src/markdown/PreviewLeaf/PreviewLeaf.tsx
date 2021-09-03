import * as React from 'react';
import { StyledLeafProps } from '@udecode/plate';
import { getPreviewLeafStyles } from './PreviewLeaf.styles';

export const PreviewLeaf = (props: any) => {
	const { children, attributes, leaf } = props;

	const { root } = getPreviewLeafStyles(leaf as any);

	return (
		<span {...attributes} style={root.css[0]} className={root.className}>
			{children}
		</span>
	);
};
