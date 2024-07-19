import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import QRCode from 'qrcode.react';
import ReadSheet from './ReadSheet';
import './styles.css'

const QRCodeGenerator = () => {
  const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLScu9bpNj0k4kZsqE76cB9VuXFrtnY7EdPqtLRfgI_-m2pJOag/viewform?usp=sf_link';
  const [isWithinAllowedArea, setIsWithinAllowedArea] = useState(false);
  const allowedLatitude = 12.9725; // Example: New York City's latitude
  const allowedLongitude = 79.1614; // Example: New York City's longitude
  const allowedRadius = 20; // Allowed radius in kilometers

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          if (isWithinRadius(userLatitude, userLongitude, allowedLatitude, allowedLongitude, allowedRadius)) {
            setIsWithinAllowedArea(true);
          } else {
            setIsWithinAllowedArea(false);
          }
        },
        (error) => {
          console.error(error);
          setIsWithinAllowedArea(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsWithinAllowedArea(false);
    }
  }, []);

  const isWithinRadius = (userLat, userLng, allowedLat, allowedLng, radius) => {
    const toRadians = degree => degree * (Math.PI / 180);
    const earthRadiusKm = 6371;

    const dLat = toRadians(allowedLat - userLat);
    const dLng = toRadians(allowedLng - userLng);

    const lat1 = toRadians(userLat);
    const lat2 = toRadians(allowedLat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance <= radius;
  };

  return (
    <div className='qr'>
      {isWithinAllowedArea ? (
        <div className='ok'>
        <div className='tt'>
        <QRCode value={formURL} />
        </div>
          
          <p className='msg'>Scan the QR code to fill out the form.</p>
          <div className='data'>
            <ReadSheet />
          </div>
        </div>
      ) : (
        <p>Access to the form is restricted to specific locations.</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;

