/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FontColor from './plugins/fontColorWithPalette/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';

export default class BalloonEditor extends BalloonEditorBase {}

const fontsList = [ 'default', 'Open Sans', 'PT Sans', 'Roboto', 'Lobster', 'Noto Serif', 'Ubuntu', 'Lora', 'Noto Sans', 'Russo One',
	'Marck Script', 'Play', 'PT Serif', 'Sancreek', 'Ledger', 'Lato', 'Philosopher', 'Didact Gothic', 'Neucha', 'Kurale', 'Comfortaa',
	'Jura', 'Kelly Slab', 'Oranienbaum', 'Ruslan Display', 'Underdog', 'Amatic SC', 'Oswald' ];

const maxFontSize = 84;
const fontSizes = [];

for ( let j = 8; j <= maxFontSize; j++ ) {
	fontSizes.push( j );
}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Essentials,
	Alignment,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	Heading,
	Link,
	List,
	Paragraph,
	FontColor,
	FontFamily,
	FontSize,
	FontBackgroundColor
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'fontFamily',
			'fontSize',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'alignment',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'undo',
			'redo'
		]
	},
	alignment: {
		options: [ 'left', 'right', 'center', 'justify' ]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
		]
	},
	fontFamily: {
		options: fontsList
	},
	fontSize: {
		options: fontSizes
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
