import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)