'use client';

import { useEffect } from 'react';
import { shutdown, boot } from '@intercom/messenger-js-sdk';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const INTERCOM_APP_ID = 'ggimhqjf';

export default function IntercomMessenger() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Intercom should not be shown inside the base
    if (pathname.startsWith('/base')) {
      shutdown();
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

    boot(intercomConfig);

    return () => {
      shutdown();
    };
  }, [pathname, user, isLoaded]);

  return null;
}
