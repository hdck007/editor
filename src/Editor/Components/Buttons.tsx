import { Button, Icon } from './editorComponents';
import {
	insertLink,
	isLinkActive,
	unwrapLink,
	isBlockActive,
	toggleBlock,
	isMarkActive,
	toggleMark,
} from '../Utility/utils';
import { useSlate } from 'slate-react';

export const LinkButton = ({ icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isLinkActive(editor)}
			onMouseDown={(event: any) => {
				event.preventDefault();
				const url = window.prompt('Enter the URL of the link:');
				if (!url) return;
				insertLink(editor, url);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export const RemoveLinkButton = () => {
	const editor = useSlate();

	return (
		<Button
			active={isLinkActive(editor)}
			onMouseDown={(event: any) => {
				if (isLinkActive(editor)) {
					unwrapLink(editor);
				}
			}}
		>
			<Icon>link_off</Icon>
		</Button>
	);
};

export const BlockButton = ({ format, icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(editor, format)}
			onMouseDown={(event: any) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};

export const MarkButton = ({ format, icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event: any) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	);
};
