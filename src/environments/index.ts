import * as dotenv from 'dotenv'
dotenv.config()

export const PORT: number = parseInt(process.env.PORT as string, 10) || 8000
