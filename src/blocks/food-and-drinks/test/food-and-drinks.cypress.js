/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Block: Food and Drinks', function() {
	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/food-and-drinks', true );
		helpers.selectBlock( 'food & drink' );
	} );

	/**
	 * Test that we can add a food-and-drinks block to the content, not alter
	 * any settings, and are able to successfully save the block without errors.
	 */
	it( 'can be inserted without errors', function() {
		cy.get( '.wp-block-coblocks-food-and-drinks' ).should( 'exist' );
		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	/**
	 * Test the food-and-drinks block saves with custom classes
	 */
	it( 'can set custom classes', () => {
		helpers.addCustomBlockClass( 'my-custom-class', 'food-and-drinks' );
		cy.get( '.wp-block-coblocks-food-and-drinks' ).should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	it( 'can set the number of columns between 2 and 4', () => {
		helpers.setBlockStyle( 'grid' );

		helpers.openSettingsPanel( /food & drinks settings/i );

		[ 2, 3, 4 ].forEach( ( columns ) => {
			cy.get( '.components-range-control' ).contains( /columns/i ).parent().find( '.components-input-control__input' ).focus().type( `{selectall}${ columns }` );
			cy.get( '.wp-block-coblocks-food-and-drinks' ).first().should( 'have.class', 'has-columns' );
			cy.get( '.wp-block-coblocks-food-and-drinks' ).first().should( 'have.class', `has-${ columns }-columns` );
			cy.get( '.wp-block-coblocks-food-and-drinks' ).find( '[data-type="coblocks/food-item"]' ).should( 'have.length', columns );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	it( 'can set the gutter to small, medium, large, and huge', () => {
		helpers.setBlockStyle( 'grid' );

		helpers.openSettingsPanel( /food & drinks settings/i );

		[ 'Small', 'Medium', 'Large', 'Huge' ].forEach( ( gutter ) => {
			cy.get( '.components-base-control' ).contains( /gutter/i ).parent().find( `.components-button[aria-label="${ gutter }"]` ).click();
			cy.get( '.wp-block-coblocks-food-and-drinks' ).first().should( 'have.class', `has-${ gutter.toLowerCase() }-gutter` );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	it( 'can toggle images for inner food-item blocks', () => {
		cy.get( '[data-type="coblocks/food-and-drinks"]' ).first().within( () => {
			cy.get( '[data-type="coblocks/food-item"]' ).first().click( 'left' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'not.exist' );
		} );

		helpers.selectBlock( 'Food & Drink' );

		helpers.openSettingsPanel( /food & drinks settings/i );
		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /images/i ).click();

		cy.get( '[data-type="coblocks/food-and-drinks"]' ).first().within( () => {
			cy.get( '[data-type="coblocks/food-item"]' ).first().click( 'left' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'exist' );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	it( 'can toggle prices for inner food-item blocks', () => {
		cy.get( '[data-type="coblocks/food-and-drinks"]' ).first().within( () => {
			cy.get( '[data-type="coblocks/food-item"]' ).first().click( 'left' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.wp-block-coblocks-food-item__price' ).should( 'exist' );
		} );

		helpers.selectBlock( 'Food & Drink' );

		helpers.openSettingsPanel( /food & drinks settings/i );
		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /prices/i ).click();

		cy.get( '[data-type="coblocks/food-and-drinks"]' ).first().within( () => {
			cy.get( '[data-type="coblocks/food-item"]' ).first().click( 'left' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.wp-block-coblocks-food-item__price' ).should( 'not.exist' );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	/**
	 * Test the food-and-drinks block saves with custom classes
	 */
	it( 'Test the food-and-drinks block custom classes.', function() {
		helpers.addBlockToPost( 'coblocks/food-and-drinks', true );

		helpers.selectBlock( 'food & drink' );

		helpers.openSettingsPanel( /food & drinks settings/i );
		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /prices/i ).click();

		cy.get( '[data-type="coblocks/food-and-drinks"]' ).first().within( () => {
			cy.get( '[data-type="coblocks/food-item"]' ).first().click( 'left' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.wp-block-coblocks-food-item__price' ).should( 'not.exist' );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	it( 'can insert menu section with the same attributes', () => {
		helpers.openSettingsPanel( /food & drinks settings/i );

		// Set a couple attributes.
		cy.get( '.components-toggle-control' ).find( '.components-base-control__field' ).contains( /images/i ).click();
		helpers.addCustomBlockClass( 'my-custom-class', 'food-and-drinks' );

		// Click "Add Menu Section" and verify two blocks exist on the page.
		helpers.selectBlock( 'food & drink' );
		cy.get( '[data-type="coblocks/food-and-drinks"]' ).find( '.block-editor-button-block-appender' ).click();
		cy.get( '.wp-block-coblocks-food-and-drinks' ).should( 'have.length', 2 );

		cy.get( '[data-type="coblocks/food-and-drinks"]' ).last().within( () => {
			cy.get( '[data-type="coblocks/food-item"]' ).first().click( 'left' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.block-editor-media-placeholder' ).should( 'exist' );
			cy.get( '[data-type="coblocks/food-item"]' ).first().find( '.wp-block-coblocks-food-item__price' ).should( 'exist' );

			cy.get( '.wp-block-coblocks-food-and-drinks' ).should( 'have.class', 'my-custom-class' );
		} );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );

	/**
	 * Test the food-and-drinks block saves heading levels set
	 */
	it( 'Updates the inner blocks when the "Heading Level" control is changed.', function() {
		helpers.addBlockToPost( 'coblocks/food-and-drinks', true );

		// Assert headings levels are set to default (h4)
		cy.get( '[data-type="coblocks/food-and-drinks"] [data-type="coblocks/food-item"] h4' ).should( 'have.length', 2 );

		// Modify the heading level
		cy.get( '.block-editor-block-toolbar [aria-label="Change heading level"]' ).click();
		cy.get( 'div[aria-label="Change heading level"][role="menu"] button' ).contains( 'Heading 2' ).click();

		cy.get( '[data-type="coblocks/food-and-drinks"] [data-type="coblocks/food-item"] h2' ).should( 'have.length', 2 );

		helpers.checkForBlockErrors( 'coblocks/food-and-drinks' );
	} );
} );
