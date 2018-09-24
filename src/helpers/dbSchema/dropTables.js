import pool from '../helpers';

export default class dropTableSchema {
	/**
 * Database schemma.
 * @constructor
 *
 */
	constructor() {
		this.pool = pool;
		this.dropUsersTable = 'DROP TABLE IF EXISTS users';

		this.dropProductsTable = 'DROP TABLE IF EXISTS products';

		this.dropOrdersTable = 'DROP TABLE IF EXISTS orders';

		this.dropOrderItemsTable = 'DROP TABLE IF EXISTS order_items';
	}

	/**
 * drops database tables.
 * @method
 *
 */
	drop() {
		return this.pool.query(this.dropUsersTable)
			.then(() => this.pool.query(this.dropProductsTable))
			.then(() => this.pool.query(this.dropOrdersTable))
			.then(() => this.pool.query(this.dropOrderItemsTable))
			.then(() => this.pool.end())
			.catch(err => err);
	}
}

new dropTableSchema().drop();
