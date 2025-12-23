import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(`${origin}/auth/error`);
      }
      
      return NextResponse.redirect('https://app.queue.cx/dashboard');
    } catch (error) {
      console.error('Error in callback:', error);
      return NextResponse.redirect(`${origin}/auth/error`);
    }
  }

  return NextResponse.redirect(`${origin}/`);
}