'use client';

import { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';


export default function Globe3D() {
  const [isMounted, setIsMounted] = useState(false);
  const globeEl = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1;
      globeEl.current.controls().enableZoom = false;
      
      // Set initial point of view to North America (USA/Mexico/Canada)
      globeEl.current.pointOfView({ lat: 38, lng: -97, altitude: 1.5 }, 2000);
    }
  }, [isMounted]);

  if (!isMounted) return null;

  // 16 Host Cities for 2026 World Cup
  const hostCities = [
    { name: 'New York/New Jersey', lat: 40.8136, lng: -74.0744 },
    { name: 'Dallas', lat: 32.7473, lng: -97.0945 },
    { name: 'Kansas City', lat: 39.0489, lng: -94.4839 },
    { name: 'Houston', lat: 29.6847, lng: -95.4107 },
    { name: 'Atlanta', lat: 33.7554, lng: -84.4006 },
    { name: 'Los Angeles', lat: 33.9535, lng: -118.3390 },
    { name: 'Philadelphia', lat: 39.9012, lng: -75.1675 },
    { name: 'Seattle', lat: 47.5952, lng: -122.3316 },
    { name: 'San Francisco Bay Area', lat: 37.4032, lng: -121.9698 },
    { name: 'Boston', lat: 42.0909, lng: -71.2643 },
    { name: 'Miami', lat: 25.9580, lng: -80.2389 },
    { name: 'Vancouver', lat: 49.2768, lng: -123.1120 },
    { name: 'Toronto', lat: 43.6328, lng: -79.4186 },
    { name: 'Mexico City', lat: 19.3029, lng: -99.1505 },
    { name: 'Monterrey', lat: 25.6667, lng: -100.2265 },
    { name: 'Guadalajara', lat: 20.6817, lng: -103.4627 }
  ];

  // Create arcs between cities
  const arcsData = [];
  for (let i = 0; i < hostCities.length - 1; i++) {
    arcsData.push({
      startLat: hostCities[i].lat,
      startLng: hostCities[i].lng,
      endLat: hostCities[i+1].lat,
      endLng: hostCities[i+1].lng,
      color: ['#d4a843', '#00d4ff']
    });
  }

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        labelsData={hostCities}
        labelLat={d => (d as any).lat}
        labelLng={d => (d as any).lng}
        labelText={d => (d as any).name}
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => '#00ff88'}
        labelResolution={2}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
      />
    </div>
  );
}
