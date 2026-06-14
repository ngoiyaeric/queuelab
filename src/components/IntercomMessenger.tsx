'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { useAuth } from '@/components/auth-provider';
import { usePathname } from 'next/navigation';

const INTERCOM_APP_ID = 'ggimhqjf';

export default function IntercomMessenger() {
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize Intercom if user is logged in and on dashboard (the "base")
    if (user && pathname.startsWith('/dashboard')) {
      Intercom({
        app_id: INTERCOM_APP_ID,
        alignment: 'left',
      });
    } else {
      // Shutdown Intercom if not in the right context
      try {
        (Intercom as any)('shutdown');
      } catch (e) {}
    }

    return () => {
      try {
        (Intercom as any)('shutdown');
      } catch (e) {}
    };
  }, [user, pathname]);

  return null;
}
