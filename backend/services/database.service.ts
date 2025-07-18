import { Pool, PoolConfig } from "pg";

const pgConfig: PoolConfig = {
  connectionTimeoutMillis:0,
  idleTimeoutMillis: 10000,
  max: 10,
  min: 1,
  allowExitOnIdle: false,
  maxLifetimeSeconds: 0,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "DWDatabase",
};

export const myPool = new Pool(pgConfig);