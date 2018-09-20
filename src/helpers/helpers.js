import { Pool } from 'pg';

const dbConnection = process.env.DATABASE_URL || 'localhost://postgres:2geda4my99@localhost:5432/fastFoodFast';

const pool = new Pool({
	connectionString: dbConnection,
});


export default pool;
