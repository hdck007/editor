// Input:
// Nodes, Options object for class name

// output : HTML
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ELEMENT_IMAGE } from '@udecode/plate-image';

const nodeNames = ['strong', 'em', 'underline'];

// let element = document.createElement('div');
function getNodesFromHtml(html: any, parentNode: any) {
	try {
		for (let node of html.children) {
			if (node?.children.length) {
				switch (node?.nodeName.toLowerCase()) {
					case 'p':
					case 'h1':
					case 'h3':
					case 'ul':
					case 'li':
					case 'ol':
					case 'ul':
					case 'code': {
						let type =
							node?.nodeName.toLowerCase() === 'h3'
								? 'h2'
								: node?.nodeName.toLowerCase();
						let currentNode;
						if (node?.children.length) {
							currentNode = {
								type,
								children: [],
							};
							let index = parentNode.children.length;
							parentNode.children.push(currentNode);
							getNodesFromHtml(node, parentNode.children[index]);
						} else {
							currentNode = {
								type,
								children: [
									{
										text: '',
									},
								],
							};
							parentNode.children.push(currentNode);
						}
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
					case 'strong': {
						console.log(node?.nodeName, node.innerText);
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
				let currentNode: any;
				if (node?.nodeName.toLowerCase() === 'a') {
					console.log(node?.parentNode.childNodes);
					let type = node?.nodeName.toLowerCase();
					currentNode = {
						type,
						url: node.href,
						children: [
							{
								text: node.innerText,
							},
						],
					};
					parentNode.children.push(currentNode);
				} else if (node?.nodeName.toLowerCase() === 'strong') {
					// console.log(node?.nodeName, node.innerText)
					if (nodeNames.includes(node?.parentNode.nodeName.toLowerCase())) {
						console.log('happens');
						parentNode.bold = true;
					} else {
						currentNode = {
							text: node.innerText,
							bold: true,
						};
						parentNode.children.push(currentNode);
					}
				} else if (node?.nodeName.toLowerCase() === 'em') {
					if (nodeNames.includes(node?.parentNode.nodeName.toLowerCase())) {
						parentNode.italic = true;
					} else {
						currentNode = {
							text: node.innerText,
							italic: true,
						};
						parentNode.children.push(currentNode);
					}
				} else if (node?.nodeName.toLowerCase() === 'underline') {
					if (nodeNames.includes(node?.parentNode.nodeName.toLowerCase())) {
						parentNode.underline = true;
					} else {
						currentNode = {
							text: node.innerText,
							underline: true,
						};
						parentNode.children.push(currentNode);
					}
				} else {
					currentNode = {
						type: node?.nodeName.toLowerCase(),
						children: [
							{
								text: node.innerText,
							},
						],
					};
					parentNode?.children?.push(currentNode);
				}
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
