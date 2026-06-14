'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const INTERCOM_APP_ID = 'ggimhqjf';

export default function IntercomMessenger() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Intercom should not be shown inside the base
    if (pathname.startsWith('/base')) {
      try {
        (Intercom as any)('shutdown');
        // Extra assurance to hide launcher if shutdown doesn't immediately remove it
        const launcher = document.querySelector('.intercom-lightweight-app-launcher');
        if (launcher) (launcher as HTMLElement).style.display = 'none';
      } catch (e) {}
      return;
    }

    if (!isLoaded) return;

    // Initialize/Update Intercom
    const intercomConfig: any = {
      app_id: INTERCOM_APP_ID,
      alignment: 'left',
    };

    if (user) {
      intercomConfig.user_id = user.id;
      intercomConfig.email = user.primaryEmailAddress?.emailAddress;
      intercomConfig.name = user.fullName;
      intercomConfig.created_at = user.createdAt ? Math.floor(new Date(user.createdAt).getTime() / 1000) : undefined;
    }

    Intercom(intercomConfig);

    return () => {
      (Intercom as any)('shutdown');
    };
  }, [pathname, user, isLoaded]);

  return null;
}
