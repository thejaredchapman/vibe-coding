import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

interface MapPolylineProps {
  path: Array<{ lat: number; lng: number }>;
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  onClick?: () => void;
}

export default function MapPolyline({
  path,
  strokeColor = '#3b82f6',
  strokeWeight = 3,
  strokeOpacity = 0.8,
  onClick,
}: MapPolylineProps) {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    const polyline = new google.maps.Polyline({
      path,
      strokeColor,
      strokeWeight,
      strokeOpacity,
      clickable: !!onClick,
      map,
    });

    if (onClick) {
      polyline.addListener('click', onClick);
    }

    polylineRef.current = polyline;

    return () => {
      polyline.setMap(null);
    };
  }, [map, path, strokeColor, strokeWeight, strokeOpacity, onClick]);

  return null;
}
