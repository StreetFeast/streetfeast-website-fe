'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './GoogleMap.module.css';

interface GoogleMapProps {
    address?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    onMapClick?: () => void;
}

function GoogleMap({ address, latitude, longitude, zoom = 15, onMapClick }: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);

    useEffect(() => {
        const loadGoogleMaps = async () => {
            // Check if Google Maps is already loaded
            if (typeof window.google !== 'undefined') {
                initializeMap();
                return;
            }

            // Load Google Maps script
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            if (!apiKey) {
                console.error('Google Maps API key is not configured');
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => initializeMap();
            document.head.appendChild(script);

            return () => {
                // Cleanup script on unmount
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        };

        loadGoogleMaps();
    }, []);

    useEffect(() => {
        if (map && (latitude !== undefined && longitude !== undefined)) {
            updateMapLocation(latitude, longitude);
        } else if (map && address) {
            geocodeAddress(address);
        }
    }, [map, address, latitude, longitude, zoom]);

    const initializeMap = () => {
        if (!mapRef.current || typeof window.google === 'undefined') return;

        // Default to a central location if no coordinates provided
        const defaultCenter = { lat: 39.8283, lng: -98.5795 }; // Center of US

        const mapInstance = new google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: zoom,
            // Disable all controls
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            // Disable user interactions
            gestureHandling: 'none',
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            keyboardShortcuts: false,
        });

        setMap(mapInstance);
    };

    const updateMapLocation = (lat: number, lng: number) => {
        if (!map) return;

        const position = { lat, lng };
        map.setCenter(position);
        map.setZoom(zoom);

        // Remove old marker if exists
        if (marker) {
            marker.setMap(null);
        }

        // Add new marker
        const newMarker = new google.maps.Marker({
            position,
            map,
            title: address || 'Location',
        });

        setMarker(newMarker);
    };

    const geocodeAddress = (addr: string) => {
        if (!map || typeof window.google === 'undefined') return;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: addr }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                updateMapLocation(location.lat(), location.lng());
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    const handleOverlayClick = () => {
        if (onMapClick) {
            onMapClick();
        }
    };

    return (
        <div className={styles.mapContainer}>
            <div ref={mapRef} className={styles.map} />
            {/* Invisible overlay to capture all clicks */}
            <div
                ref={overlayRef}
                className={styles.mapOverlay}
                onClick={handleOverlayClick}
            />
        </div>
    );
}

export default GoogleMap;
