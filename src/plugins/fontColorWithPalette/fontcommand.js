/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module font/fontcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';

/**
 * The base font command.
 *
 * @extends module:core/command~Command
 */
export default class FontCommand extends Command {
	/**
	 * Creates an instance of the command.
	 *
	 * @param {module:core/editor/editor~Editor} editor Editor instance.
	 * @param {String} attributeKey The name of a model attribute on which this command operates.
	 */
	constructor( editor, attributeKey ) {
		super( editor );

		/**
		 * When set, it reflects the {@link #attributeKey} value of the selection.
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean} module:font/fontcommand~FontCommand#value
		 */

		/**
		 * A model attribute on which this command operates.
		 *
		 * @readonly
		 * @member {Boolean} module:font/fontcommand~FontCommand#attributeKey
		 */
		this.attributeKey = attributeKey;
		this.set( 'paletteColor', undefined );
	}

	/**
	 * @inheritDoc
	 */
	refresh() {
		const model = this.editor.model;
		const doc = model.document;

		const attrValue = doc.selection.getAttribute( this.attributeKey );
		this.value = attrValue && attrValue.color;
		this.paletteColor = attrValue && attrValue.paletteId ? attrValue.color : undefined;
		this.isEnabled = model.schema.checkAttributeInSelection( doc.selection, this.attributeKey );
	}

	/**
	 * Executes the command. Applies the `value` of the {@link #attributeKey} to the selection.
	 * If no `value` is passed, it removes the attribute from the selection.
	 *
	 * @protected
	 * @param {Object} [options] Options for the executed command.
	 * @param {String} [options.value] The value to apply.
	 * @fires execute
	 */
	execute( options = {} ) {
		const model = this.editor.model;
		const document = model.document;
		const selection = document.selection;

		const value = { color: options.value, paletteId: options.paletteId };

		model.change( writer => {
			if ( selection.isCollapsed ) {
				if ( value ) {
					writer.setSelectionAttribute( this.attributeKey, value );
				} else {
					writer.removeSelectionAttribute( this.attributeKey );
				}
			} else {
				const ranges = model.schema.getValidRanges( selection.getRanges(), this.attributeKey );

				for ( const range of ranges ) {
					if ( value ) {
						writer.setAttribute( this.attributeKey, value, range );
					} else {
						writer.removeAttribute( this.attributeKey, range );
					}
				}
			}
		} );
	}
}