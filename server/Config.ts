function parseNumberEnv(name: string, defaultValue: number): number {
  if (process.env[name]) {
    // @ts-ignore
    return +process.env[name]
  }

  return defaultValue
}

export default {
  port: parseNumberEnv('PORT', 3000),
  mysql: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'db',
    port: parseNumberEnv('MYSQL_PORT', 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  redis: {
    port: parseNumberEnv('REDIS_PORT', 6379),
  },
}
