import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const dbConnection = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString: dbConnection,
});


export default pool;
