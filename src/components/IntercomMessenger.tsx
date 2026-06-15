'use client';

import { useEffect } from 'react';
import { boot, shutdown, update } from '@intercom/messenger-js-sdk';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const INTERCOM_APP_ID = 'ggimhqjf';

export default function IntercomMessenger() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Handle Authentication and Initialization
  useEffect(() => {
    if (!isLoaded) return;

    // Shutdown previous session to ensure clean state
    shutdown();

    const isBaseRoute = pathname.startsWith('/base');
    const intercomConfig: any = {
      app_id: INTERCOM_APP_ID,
      alignment: 'left',
      hide_default_launcher: isBaseRoute,
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
    // We only want to reboot when the user identity actually changes.
    // Route-based visibility is handled by the second effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoaded]);

  // Handle Visibility and metadata updates on route or user changes
  useEffect(() => {
    if (!isLoaded) return;

    const updateConfig: any = {
      hide_default_launcher: pathname.startsWith('/base'),
    };

    if (user) {
      updateConfig.email = user.primaryEmailAddress?.emailAddress;
      updateConfig.name = user.fullName;
    }

    update(updateConfig);
  }, [pathname, user, isLoaded]);

  return null;
}
