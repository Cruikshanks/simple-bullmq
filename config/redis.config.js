import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || '6379'
}

export { config }
