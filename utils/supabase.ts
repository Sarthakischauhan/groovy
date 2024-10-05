import { createClient } from '@supabase/supabase-js'

export default createClient(
  process.env.NEXT_PUBLIC_API_URL!,
  process.env.NEXT_PUBLIC_API_KEY!
)

