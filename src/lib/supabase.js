import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ndnmvbqlwagzsyiryqgs.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbm12YnFsd2FnenN5aXJ5cWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODY3NjgsImV4cCI6MjA2NzE2Mjc2OH0.NpE-LcDaeTsQqlcVUHnLyHM5qnU_SPz5qGURYdXkT2Q'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ){
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})