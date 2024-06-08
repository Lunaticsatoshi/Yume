'use server';

import { createSupabaseServerClient } from '@/utils/supabase';
import { redirect } from 'next/navigation';

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}
