import pool from '../connect';

export default class CreateTableSchema {
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

		this.createProductsTable = `CREATE TABLE IF NOT EXISTS products(
        product_number serial PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        description text NOT NULL,
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
        total float NOT NULL
      )`;

		this.createOrderItemsTable = `CREATE TABLE IF NOT EXISTS order_items(
        product_number integer REFERENCES products(product_number) ON DELETE RESTRICT,
        order_id integer REFERENCES orders(id) ON DELETE CASCADE,
        quantity integer NOT NULL,
        total float NOT NULL,
        PRIMARY KEY(product_number, order_id)
      )`;
	}


	create() {
		return this.pool.query(this.createUsersTable)
			.then(() => this.pool.query(this.createProductsTable))
			.then(() => this.pool.query(this.createOrdersTable))
			.then(() => this.pool.query(this.createOrderItemsTable))
			.then(() => this.pool.end())
			.catch(err => err);
	}
}

new CreateTableSchema().create();
