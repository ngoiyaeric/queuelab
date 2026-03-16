'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { useAuth } from '@/components/auth-provider';

const INTERCOM_APP_ID = 'ggimhqjf';

export default function IntercomMessenger() {
  const { user } = useAuth();
  // Place on the right when authenticated (dashboard), left on pre-auth pages
  const alignment = user ? 'right' : 'left';

  useEffect(() => {
    // Initialize Intercom
    Intercom({
      app_id: INTERCOM_APP_ID,
      alignment,
    });

    // Clean up function to shut down Intercom when the component unmounts
    return () => {
      (Intercom as any)('shutdown');
    };
  }, [alignment]);

  // The component does not need to render anything visible itself.
  return null;
}