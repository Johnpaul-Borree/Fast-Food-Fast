import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const dbConnection = process.env.DATABASE_URL;
/**
 * function pool returns a connection to database
 * @param  {string} connectionString - database connection url
 */
const pool = new Pool({
	connectionString: dbConnection,
});


export default pool;
