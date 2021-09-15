// Input:
// Nodes, Options object for class name

// output : HTML
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ELEMENT_IMAGE } from '@udecode/plate-image';

// let element = document.createElement('div');
function getNodesFromHtml(html: any, parentNode: any) {
	try {
		for (let node of html.children) {
			if (node?.nodeName.toLowerCase() !== 'span') {
				switch (node?.nodeName.toLowerCase()) {
					case 'p':
					case 'h1':
					case 'h2':
					case 'ul':
					case 'li':
					case 'ol':
					case 'ul':
					case 'code': {
						let type = node.getAttribute('data-node-type');
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
					case 'a': {
						let type = node.getAttribute('data-node-type');
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
          case 'figure': {
            let type = node.getAttribute('data-node-type');
						let currentNode = {
              type,
              url: node.children[0].src,
              children: [],
              caption: [
                {
                  text: node.children[1].innerText,
                },
              ],
            };
            parentNode.children.push(currentNode);
          }
					case 'div': {
						let type = node.getAttribute('data-node-type');
						let currentNode;
						if (type === ELEMENT_MEDIA_EMBED) {
							currentNode = {
								type,
								url: node.children[0].src,
								children: [],
							};
						}
						parentNode.children.push(currentNode);
						break;
					}
				}
			} else {
				let currentNode: any = {
					text: node.innerText,
				};
				if (node.classList.contains('underline')) {
					currentNode = {
						...currentNode,
						underline: true,
					};
				}
				if (node.classList.contains('font-bold')) {
					currentNode = {
						...currentNode,
						bold: true,
					};
				}
				if (node.classList.contains('italic')) {
					currentNode = {
						...currentNode,
						italic: true,
					};
				}
				parentNode.children.push(currentNode);
			}
		}
	} catch (err) {
		console.error(err);
	}
}

export function convertHtmlToNode(html: any) {
	let convertedObject = {
		children: [],
	};
	getNodesFromHtml(html, convertedObject);

	return convertedObject.children;
}
