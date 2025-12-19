import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      // Redirect to an error page or show an error message
      return NextResponse.redirect(new URL('/auth/error', request.url));
    }
  }

  // Redirect if no code is provided
  return NextResponse.redirect(new URL('/', request.url));
}
