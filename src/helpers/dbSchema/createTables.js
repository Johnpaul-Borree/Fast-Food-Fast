import pool from '../connect';

export default class CreateTableSchema {
	/**
 * Database schemma.
 * @constructor
 *
 */
	constructor() {
		this.pool = pool;
		this.createUsersTable = `CREATE TABLE IF NOT EXISTS users(
        id serial PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone_number varchar(15) NOT NULL,
        hashed_password varchar(255) NOT NULL,
        is_admin boolean DEFAULT false
      )`;

      this.dropProduct = 'DROP TABLE IF EXISTS products';
		this.createProductsTable = `CREATE TABLE IF NOT EXISTS products(
        product_number serial PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        product_image text,
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp,
        price float NOT NULL
      )`;

		this.createOrdersTable = `CREATE TABLE IF NOT EXISTS orders(
        id serial PRIMARY KEY NOT NULL,
        user_id integer REFERENCES users(id) ON DELETE CASCADE,
        address text NOT NULL,
        created_at timestamp DEFAULT NOW(),
        updated_at timestamp,
        total_price float NOT NULL,
        status varchar(255) DEFAULT 'New'
      )`;

		this.createOrderItemsTable = `CREATE TABLE IF NOT EXISTS order_items(
        order_items_id serial PRIMARY KEY NOT NULL,
        order_id integer REFERENCES orders(id) ON DELETE CASCADE,
        item varchar(255) NOT NULL,
        quantity integer NOT NULL,
        price float NOT NULL
      )`;
	}

	/**
 * creates database tables.
 * @method
 *
 */
	create() {
    return this.pool.query(this.createUsersTable)
    .then(() => this.pool.query(this.dropProduct))
			.then(() => this.pool.query(this.createProductsTable))
			.then(() => this.pool.query(this.createOrdersTable))
			.then(() => this.pool.query(this.createOrderItemsTable))
			.then(() => this.pool.end())
			.catch(err => err);
	}
}

new CreateTableSchema().create();
