// Input:
// Nodes, Options object for class name

// output : HTML
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ELEMENT_IMAGE } from '@udecode/plate-image';
import {
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_PARAGRAPH,
	ELEMENT_CODE_BLOCK,
	ELEMENT_UL,
	ELEMENT_OL,
	ELEMENT_LI,
	ELEMENT_LINK,
	ELEMENT_BLOCKQUOTE,
	ELEMENT_LIC,
	ELEMENT_CODE_LINE,
} from '@udecode/plate';

// let element = document.createElement('div');
export function convertNodeToHtml(parent: any, nodes: any) {
	for (let node of nodes) {
		let childNode;
		if (node?.type) {
			switch (node?.type) {
				case ELEMENT_H1: {
					childNode = document.createElement('h1');
					childNode.classList.add('text-3xl')
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_H2: {
					childNode = document.createElement('h2');
					childNode.classList.add('text-2xl')
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_PARAGRAPH: {
					childNode = document.createElement('p');
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_IMAGE: {
					childNode = document.createElement('figure');
					let figCaption = document.createElement('figcaption');
					let image = document.createElement('img');
					image.src = node?.url;
					figCaption.innerText = node.caption[0].text;
					figCaption.classList.add('text-center')
					figCaption.classList.add('text-gray-400')
					childNode.appendChild(image);
					childNode.appendChild(figCaption);
					childNode.classList.add('w-full')
					break;
				}
				case ELEMENT_MEDIA_EMBED: {
					childNode = document.createElement('div');
					let iframe = document.createElement('iframe');
					childNode.classList.add('w-full')
					iframe.classList.add('w-full')
					iframe.classList.add('h-96')
					iframe.src = node?.url;
					childNode.appendChild(iframe);
					break;
				}
				case ELEMENT_CODE_BLOCK: {
					childNode = document.createElement('div');
					childNode.classList.add('p-3');
					childNode.classList.add('bg-gray-100');
					childNode.classList.add('w-full');
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_UL: {
					childNode = document.createElement('ul');
					childNode.classList.add('pl-4');
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_OL: {
					childNode = document.createElement('ol');
					childNode.classList.add('pl-4');
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_LI: {
					childNode = document.createElement('li');
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_LIC: {
					convertNodeToHtml(parent, node?.children);
					break;
				}
				case ELEMENT_LINK: {
					childNode = document.createElement('a');
					childNode.href = node?.url;
					childNode.setAttribute('target', '_blank');
					convertNodeToHtml(childNode, node?.children);
					break;
				}
				case ELEMENT_BLOCKQUOTE: {
					childNode = document.createElement('blockquote');
					childNode.classList.add('block-quote')
					convertNodeToHtml(childNode, node.children);
					break;
				}
				case ELEMENT_CODE_LINE: {
					childNode = document.createElement('p');
					convertNodeToHtml(childNode, node.children);
					break;
				}
			}
		} else {
			if (node.text) {
				childNode = document.createElement('span');
				// let temp = document.createElement('span');
				childNode.innerText = node.text;
				if (node?.bold) {
					childNode.classList.add('font-bold');
				}
				if (node?.italic) {
					childNode.classList.add('italic');
				}
				if (node?.underline) {
					childNode.classList.add('underline');
				}
				if (node?.code) {
					childNode.classList.add('bg-gray-100');
					childNode.classList.add('p-1');
				}
			}
		}
		if (childNode) {
			if (node?.type) {
				childNode.setAttribute('data-node-type', node?.type);
			} else {
				childNode.setAttribute('data-node-type', 'leaf');
			}
			parent.appendChild(childNode);
		}
	}
}

// if (node?.bold) {
// 	let bold = document.createElement('strong');
// 	temp = bold.appendChild(temp);
// }
// if (node?.italic) {
// 	let italic = document.createElement('emphasis');
// 	temp = italic.appendChild(temp);
// }
// if (node?.underline) {
// 	let underline = document.createElement('u');
// 	temp = underline.appendChild(temp);
// }
// if (node?.code) {
// 	let code = document.createElement('code');
// 	temp = code.appendChild(temp);
// }
// childNode.appendChild(temp);
