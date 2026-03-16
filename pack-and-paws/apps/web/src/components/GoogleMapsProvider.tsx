import { type ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

if (!GOOGLE_MAPS_KEY && import.meta.env.DEV) {
  console.warn(
    '[Pack & Paws] VITE_GOOGLE_MAPS_KEY is not set. ' +
    'Add it to apps/web/.env and restart the dev server.'
  );
}

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_KEY}>
      {children}
    </APIProvider>
  );
}
