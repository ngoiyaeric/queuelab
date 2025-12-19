import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      // Redirect to an error page or show an error message
      return NextResponse.redirect(`${origin}/auth/error`);
    }
  }

  // Redirect if no code is provided
  return NextResponse.redirect(`${origin}/`);
}
