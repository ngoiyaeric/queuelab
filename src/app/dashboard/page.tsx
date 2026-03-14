'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '98.css';
import './j-space.css';

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Set classic Windows 98 background color
    document.body.style.backgroundColor = '#008080';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div id="app" className="j-space-container">
      <div className="window" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="title-bar">
          <div className="title-bar-text">Jeremy&apos;s Space - Dashboard</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body" style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          <div className="welcome-section">
            <h1 className="animate-title">Welcome to the Redesigned Dashboard</h1>
            <p>The dashboard code has been completely replaced with the aesthetic and functionality from the J-Space repository.</p>
          </div>

          <div className="desktop-icons" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 110px))', gap: '20px', marginTop: '30px' }}>
            <div className="desktop-folder" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Image src="/assets/directory_computer-0.png" alt="About Me" width={48} height={48} style={{ marginBottom: '5px', margin: '0 auto' }} />
              <div style={{ color: 'white', textShadow: '1px 1px black' }}>About Me</div>
            </div>
            <div className="desktop-folder" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Image src="/assets/picture-painting.png" alt="Projects" width={48} height={48} style={{ marginBottom: '5px', margin: '0 auto' }} />
              <div style={{ color: 'white', textShadow: '1px 1px black' }}>Projects</div>
            </div>
            <div className="desktop-folder" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Image src="/assets/paint_old.png" alt="Skills" width={48} height={48} style={{ marginBottom: '5px', margin: '0 auto' }} />
              <div style={{ color: 'white', textShadow: '1px 1px black' }}>Skills</div>
            </div>
          </div>

          <div className="status-bar" style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
            <p className="status-bar-field">Press F1 for help</p>
            <p className="status-bar-field">Status: Online</p>
            <p className="status-bar-field">CPU Usage: 2%</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #008080 !important;
        }
        .j-space-container {
          background-color: #008080;
          min-height: 100vh;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
