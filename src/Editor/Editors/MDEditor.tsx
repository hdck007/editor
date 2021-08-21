import React, { useCallback, useMemo } from 'react';
import Prism from 'prismjs';
import { Slate, Editable, withReact } from 'slate-react';
import { Text, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Toolbar } from '../Components/editorComponents';

(Prism.languages.markdown = Prism.languages.extend('markup', {})),
	Prism.languages.insertBefore('markdown', 'prolog', {
		blockquote: {
			pattern: /^>(?:[\t ]*>)*/m,
			alias: 'punctuation',
		},
		code: [
			{
				pattern: /^(?: {4}|\t).+/m,
				alias: 'keyword',
			},
			{ pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
		],
		title: [
			{
				pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
				alias: 'important',
				inside: { punctuation: /==+$|--+$/ },
			},
			{
				pattern: /(^\s*)#+.+/m,
				lookbehind: !0,
				alias: 'important',
				inside: { punctuation: /^#+|#+$/ },
			},
		],
		hr: {
			pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: !0,
			alias: 'punctuation',
		},
		list: {
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: !0,
			alias: 'punctuation',
		},
		'url-reference': {
			pattern:
				/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
				string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				punctuation: /^[\[\]!:]|[<>]/,
			},
			alias: 'url',
		},
		bold: {
			pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
			lookbehind: !0,
			inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
		},
		italic: {
			pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
			lookbehind: !0,
			inside: { punctuation: /^[*_]|[*_]$/ },
		},
		url: {
			pattern:
				/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
			inside: {
				variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
				string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
			},
		},
	});

const MDEditor = ({ isMarkdown, setIsMarkdown, value, setValue }: any) => {
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);
	const decorate = useCallback(([node, path]) => {
		const ranges: any = [];

		if (!Text.isText(node)) {
			return ranges;
		}

		const getLength = (token: any) => {
			if (typeof token === 'string') {
				return token.length;
			} else if (typeof token.content === 'string') {
				return token.content.length;
			} else {
				return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
			}
		};

		const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
		let start = 0;

		for (const token of tokens) {
			const length = getLength(token);
			const end = start + length;

			if (typeof token !== 'string') {
				ranges.push({
					[token.type]: true,
					anchor: { path, offset: start },
					focus: { path, offset: end },
				});
			}

			start = end;
		}

		return ranges;
	}, []);

	return (
		<div className='mx-auto my-9 w-5/6 h-3/4 border-2 md:w-6/6 px-5 pb-4 overflow-y-auto relative'>
			<Slate
				editor={editor}
				value={value}
				onChange={(value) => setValue(value)}
			>
				<div>
					<Toolbar
						className='sticky'
						setIsMarkdown={setIsMarkdown}
						isMarkdown={isMarkdown}
					/>
					<Editable
						decorate={decorate}
						renderLeaf={renderLeaf}
						placeholder='Write some markdown...'
					/>
				</div>
			</Slate>
		</div>
	);
};

const Leaf = ({ attributes, children, leaf }: any) => {
	return (
		<span
			{...attributes}
			className={`${leaf.bold && 'font-bold'}
        ${leaf.italic && 'italic'}
        ${leaf.underlined && 'underline'}
        ${leaf.title && 'inline-block font-bold text-xl mx-0 mt-5 mb-3'}
        ${leaf.list && 'pl-5 text-xl leading-3'}
        ${leaf.hr && 'inline-block text-center border-b-2'}
        ${leaf.blockquote && 'inline-block border-l-2 pl-3 bg-blue-300 italic'}
        ${leaf.code && 'bg-gray-200 font-mono py-1'}`}
		>
			{children}
		</span>
	);
};

export default MDEditor;
