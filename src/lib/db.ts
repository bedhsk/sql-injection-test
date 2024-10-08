import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export async function getUserByEmail(email: string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

export async function createUser(email: string, hashedPassword: string) {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
    [email, hashedPassword]
  );
  return result.rows[0];
}

// ADVERTENCIA: Esta función es vulnerable a inyecciones SQL
export async function getUserByEmailUnsafe(email: string, password: string) {
  // ADVERTENCIA: Esta consulta es extremadamente vulnerable a inyecciones SQL
  const query = `SELECT * FROM users WHERE email = '${email}' OR password = '${password}'`;
  console.log("Query ejecutada:", query);
  try {
    const result = await pool.query(query);
    console.log("Resultado de la query:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error en la query:", error);
    throw error;
  }
}

export default pool;
