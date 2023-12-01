import { config } from 'dotenv'
import 'dotenv/config'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  // DATABASE_CLIENT: z.enum(['sqlite3', 'pg']),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variable', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
