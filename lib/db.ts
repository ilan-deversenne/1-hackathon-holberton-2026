import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fcqeqgbqxuepnafvpnxr.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_KEY environment variable")
}
const supabase = createClient(supabaseUrl, supabaseKey)

export {
    supabase
}
