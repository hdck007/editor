// Input:
// Nodes, Options object for class name

// output : HTML
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ELEMENT_IMAGE } from '@udecode/plate-image';

const nodeNames = ['strong', 'em', 'underline'];

// let element = document.createElement('div');
function getNodesFromHtml(html: any, parentNode: any) {
	try {
		for (let node of html.childNodes) {
			if (node?.hasChildNodes()) {
				switch (node?.nodeName.toLowerCase()) {
					case 'p':
					case 'h1':
					case 'h2':
					case 'h3':
					case 'ul':
					case 'li':
					case 'ol':
					case 'ul':
					case 'code':
					case 'blockquote': {
						let type =
							node?.nodeName.toLowerCase() === 'h3'
								? 'h2'
								: node?.nodeName.toLowerCase();
						let currentNode;
						currentNode = {
							type,
							children: [],
						};
						let index = parentNode.children.length;
						parentNode.children.push(currentNode);
						getNodesFromHtml(node, parentNode.children[index]);
						break;
					}
					case 'figure': {
						let type = ELEMENT_IMAGE;
						let currentNode = {
							type,
							url: node.children[0].src,
							children: [
								{
									text: '',
								},
							],
							caption: [
								{
									text: node.children[1].innerText,
								},
							],
						};
						parentNode.children.push(currentNode);
						break;
					}
					case 'a': {
						let type = node?.nodeName.toLowerCase();
						let currentNode = {
							type,
							url: node.href,
							children: [],
						};
						let index = parentNode.children.length;
						parentNode.children.push(currentNode);
						getNodesFromHtml(node, parentNode.children[index]);
						break;
					}
					case 'strong': {
						if (nodeNames.includes(node?.parentNode.nodeName.toLowerCase())) {
							parentNode.bold = true;
							getNodesFromHtml(node, parentNode);
						} else {
							let currentNode = {
								text: node.innerText,
								bold: true,
							};
							let index = parentNode.children.length;
							parentNode.children.push(currentNode);
							getNodesFromHtml(node, parentNode.children[index]);
						}
						break;
					}
					case 'em': {
						if (nodeNames.includes(node?.parentNode.nodeName.toLowerCase())) {
							parentNode.italic = true;
							getNodesFromHtml(node, parentNode);
						} else {
							let currentNode = {
								text: node.innerText,
								italic: true,
							};
							let index = parentNode.children.length;
							parentNode.children.push(currentNode);
							getNodesFromHtml(node, parentNode.children[index]);
						}
						break;
					}
					case 'underline': {
						if (nodeNames.includes(node?.parentNode.nodeName.toLowerCase())) {
							parentNode.underline = true;
							getNodesFromHtml(node, parentNode);
						} else {
							let currentNode = {
								text: node.innerText,
								underline: true,
							};
							let index = parentNode.children.length;
							parentNode.children.push(currentNode);
							getNodesFromHtml(node, parentNode.children[index]);
						}
						break;
					}
				}
			} else {
				let currentNode: any = {
					text: node.textContent,
				};
				parentNode?.children?.push(currentNode);
			}
		}
	} catch (err) {
		console.error(err);
	}
}

export function convertHtmlToNodePrev(html: any) {
	let convertedObject = {
		children: [],
	};
	getNodesFromHtml(html, convertedObject);

	return convertedObject.children;
}
