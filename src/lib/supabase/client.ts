'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('Supabase URL:', url)
  console.log('Supabase Key exists:', !!anon)
  
  if (!url || !anon) {
    console.error('Missing Supabase environment variables')
    return null
  }
  
  try {
    return createBrowserClient(url, anon)
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    return null
  }
}
