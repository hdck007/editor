/* eslint-disable react/display-name */
import React, { Ref, PropsWithChildren } from 'react';
import { BlockButton, MarkButton, LinkButton } from './Buttons';
import { Popover } from 'antd';
import { AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import {
	FaBold,
	FaItalic,
	FaUnderline,
	FaQuoteRight,
	FaCode,
} from 'react-icons/fa';
import { LegacyRef } from 'react';
import { useState } from 'react';

interface BaseProps {
	className: string;
	[key: string]: unknown;
}

export const Button = React.forwardRef(
	(
		{
			className,
			active,
			reversed,
			...props
		}: PropsWithChildren<
			{
				active: boolean;
				reversed: boolean;
			} & BaseProps
		>,
		ref: LegacyRef<HTMLSpanElement>
	) => (
		<span
			{...props}
			ref={ref}
			className='cursor-pointer'
			style={{
				cursor: 'pointer',
				color: active ? 'black' : '#919191',
			}}
		/>
	)
);

export const Icon = React.forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: LegacyRef<HTMLSpanElement>
	) => <span {...props} ref={ref} className='align-bottom text-xl' />
);

export const Menu = React.forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: LegacyRef<HTMLDivElement>
	) => (
		<div
			{...props}
			ref={ref}
			className='flex w-2/6 justify-between items-center'
		/>
	)
);

export const Toolbar = React.forwardRef(
	(
		{
			className,
			setIsMarkdown,
			isMarkdown,
			...props
		}: PropsWithChildren<BaseProps> | any,
		ref: Ref<HTMLDivElement>
	) => {
		const [visible, setVisible] = useState(false);

		return (
			<div className='w-full sticky top-0 bg-gray-200 py-3 px-6 rounded-sm mb-2 z-10 flex justify-between'>
				{isMarkdown ? (
					'Markdown'
				) : (
					<Menu {...props} ref={ref}>
						<MarkButton format='bold' icon={<FaBold />} />
						<MarkButton format='italic' icon={<FaItalic />} />
						<MarkButton format='underline' icon={<FaUnderline />} />
						<BlockButton format='code' icon={<FaCode />} />
						<BlockButton format='block-quote' icon={<FaQuoteRight />} />
						<BlockButton
							format='numbered-list'
							icon={<AiOutlineOrderedList />}
						/>
						<BlockButton
							format='bulleted-list'
							icon={<AiOutlineUnorderedList />}
						/>
						<Popover
							content={<a onClick={() => setVisible((prev) => !prev)}>Close</a>}
							title='Title'
							trigger='click'
							visible={visible}
							onVisibleChange={(visible) => setVisible(visible)}
						>
							<BlockButton
								format='bulleted'
								onClick={() => setVisible(true)}
								icon={<AiOutlineUnorderedList />}
							/>
						</Popover>
						<LinkButton icon={<BsLink45Deg />} />
					</Menu>
				)}
				<Button onClick={() => setIsMarkdown((prev: boolean) => !prev)}>
					{isMarkdown ? 'Editor Mode' : 'Markdown Mode'}
				</Button>
			</div>
		);
	}
);
