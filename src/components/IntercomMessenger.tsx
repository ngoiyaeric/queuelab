'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

const INTERCOM_APP_ID = 'ggimhqjf';

export default function IntercomMessenger() {
  useEffect(() => {
    // Initialize Intercom
    Intercom({
      app_id: INTERCOM_APP_ID,
      // Set alignment to 'left' to place the messenger on the bottom left.
      alignment: 'left',
      // The 'talk to sales' button text is typically configured in the Intercom
      // workspace settings, as the SDK does not provide a direct option for
      // the default launcher's text.
    });

    // Clean up function to shut down Intercom when the component unmounts
    return () => {
      Intercom('shutdown');
    };
  }, []);

  // The component does not need to render anything visible itself.
  return null;
}
