import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htvjkpsdpwwvxrkcjjdz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0dmprcHNkcHd3dnhya2NqamR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDM4NDQsImV4cCI6MjA4ODIxOTg0NH0.kHz_Kp3Z_qqxyKcs_eXsh7s62CAqJrp1T8e7Dmj2g9w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)