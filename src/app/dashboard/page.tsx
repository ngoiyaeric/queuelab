'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import '98.css';
import './j-space.css';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: 'About Me.exe', isOpen: true, isMinimized: false, zIndex: 10 },
    { id: 'projects', title: 'My Projects.exe', isOpen: true, isMinimized: false, zIndex: 11 },
    { id: 'skills', title: 'Skills.exe', isOpen: true, isMinimized: false, zIndex: 12 },
    { id: 'hobbies', title: 'Hobbies.exe', isOpen: true, isMinimized: false, zIndex: 13 },
    { id: 'interactive', title: 'Interactive.exe', isOpen: true, isMinimized: false, zIndex: 14 },
  ]);
  const [maxZIndex, setMaxZIndex] = useState(20);
  const [activeTab, setActiveTab] = useState('all');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsMounted(true);
    document.body.style.backgroundColor = '#008080';
    
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      document.body.style.backgroundColor = '';
      clearInterval(timer);
    };
  }, []);

  const bringToFront = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w));
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const openWindow = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ } : w));
  };

  if (!isMounted) return null;

  const renderWindow = (id: string, content: React.ReactNode) => {
    const win = windows.find(w => w.id === id);
    if (!win || !win.isOpen || win.isMinimized) return null;

    return (
      <div 
        className={`window window-${id} window-pop-open`} 
        style={{ 
          position: 'absolute', 
          zIndex: win.zIndex,
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={() => bringToFront(id)}
      >
        <div className="title-bar">
          <div className="title-bar-text">{win.title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }} />
            <button aria-label="Maximize" />
            <button aria-label="Close" onClick={(e) => { e.stopPropagation(); closeWindow(id); }} />
          </div>
        </div>
        <div className="window-body">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div id="app" className="win98-desktop" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop Icons */}
      <div id="desktop-folder" className="desktop-folder" onDoubleClick={() => openWindow('about')}>
        <Image src="/assets/directory_computer-0.png" alt="Computer" width={48} height={48} />
        <span>Double Click Me!</span>
      </div>
      <div id="desktop-blog" className="desktop-folder">
        <Image src="/assets/user-world.png" alt="Blog" width={48} height={48} />
        <span>See More Jeremy!</span>
      </div>
      <div id="desktop-chatbox" className="desktop-folder">
        <Image src="/assets/user-chatbox.png" alt="Chat" width={48} height={48} />
        <span>Chatbox</span>
      </div>
      <div id="desktop-theme" className="desktop-folder">
        <Image src="/assets/paint_old.png" alt="Theme" width={48} height={48} />
        <span>Theme Editor</span>
      </div>
      <div id="desktop-thanks" className="desktop-folder">
        <Image src="/assets/picture-painting.png" alt="Thanks" width={48} height={48} />
        <span>Thank you!</span>
      </div>

      {/* Windows */}
      {renderWindow('about', (
        <div style={{ padding: '10px' }}>
          <h2 style={{ color: 'black', fontSize: '2em', marginBottom: '5px' }}>Jeremy Liu</h2>
          <p className="bold-title">Computer Engineer Undergrad @ UofT</p>
          <p>I am dedicated to inspiring people and creating positive spaces around the world.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Image src="/assets/cruisesunset.JPG" alt="Jeremy" width={100} height={100} style={{ border: '1px solid #808080' }} />
            <Image src="/assets/Jeremypixel.png" alt="Pixel Me" width={100} height={100} style={{ border: '1px solid #808080' }} />
          </div>
          <div className="social-buttons-grid">
            <a href="#" className="social-btn"><Image src="/assets/linkedin-icon.png" alt="LinkedIn" width={20} height={20} /> LinkedIn</a>
            <a href="#" className="social-btn"><Image src="/assets/email-icon.png" alt="Email" width={20} height={20} /> Email</a>
            <a href="#" className="social-btn"><Image src="/assets/github-icon.png" alt="GitHub" width={20} height={20} /> GitHub</a>
            <a href="#" className="social-btn"><Image src="/assets/resume-icon.png" alt="Resume" width={20} height={20} /> Resume</a>
          </div>
        </div>
      ))}

      {renderWindow('skills', (
        <div style={{ padding: '10px' }}>
          <h3 style={{ borderBottom: '1px solid #808080', paddingBottom: '5px' }}>Programming Languages</h3>
          <p>Python, C, JavaScript, TypeScript, MATLAB, SQL</p>
          <h3 style={{ borderBottom: '1px solid #808080', paddingBottom: '5px', marginTop: '15px' }}>Data & ML</h3>
          <p>Pytorch, Scikit-learn, Matplotlib, Pandas, NumPy, OpenCV, BeautifulSoup, Selenium</p>
        </div>
      ))}

      {renderWindow('hobbies', (
        <div style={{ padding: '10px' }}>
          <h3>OUTSIDE of Academics</h3>
          <p>I create origami, train Brazilian Jiu-Jitsu, write (legal) graffiti, and longboard.</p>
          <div style={{ display: 'flex', gap: '5px', marginTop: '10px', overflowX: 'auto' }}>
            <Image src="/assets/pixelbjj.jpg" alt="BJJ" width={60} height={60} />
            <Image src="/assets/bjj-grappling.gif" alt="Grappling" width={60} height={60} />
          </div>
        </div>
      ))}

      {renderWindow('interactive', (
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <p>you can interact with windows!</p>
          <Image src="/assets/ascii-gif.gif" alt="ASCII" width={100} height={100} unoptimized />
        </div>
      ))}

      {renderWindow('projects', (
        <>
          <div className="projects-tabs">
            {['all', 'Sinatra', 'LockBlock', 'UFC Index', 'Binder'].map(tab => (
              <button 
                key={tab} 
                className={`project-tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="projects-tab-content">
            {activeTab === 'all' && (
              <div style={{ padding: '10px' }}>
                <h2 style={{ fontSize: '3em', marginBottom: '20px' }}>My Projects</h2>
                
                <div className="project-card">
                  <div className="project-card-content">
                    <h3 className="project-card-title">Sinatra</h3>
                    <p className="project-card-description">A DAW that turns your voice into any instrument of your choice.</p>
                    <p className="project-card-stack"><strong>Front:</strong> React, TypeScript, Vite, Tailwind CSS, Three.js</p>
                    <p className="project-card-stack"><strong>Back:</strong> Python, FastAPI, Supabase</p>
                    <div className="project-card-buttons">
                      <button className="social-btn">Website</button>
                      <button className="social-btn">GitHub</button>
                    </div>
                  </div>
                  <Image src="/assets/sinatrademo.gif" alt="Sinatra" width={200} height={120} className="project-list-image" unoptimized />
                </div>

                <div className="project-card" style={{ marginTop: '20px' }}>
                  <div className="project-card-content">
                    <h3 className="project-card-title">LockBlock</h3>
                    <p className="project-card-description">A smart security system using Arduino and computer vision.</p>
                    <p className="project-card-stack"><strong>Front:</strong> JavaScript, Phantom Wallet</p>
                    <p className="project-card-stack"><strong>Back:</strong> Python, Flask, OpenCV, Solana</p>
                    <div className="project-card-buttons">
                      <button className="social-btn">GitHub</button>
                      <button className="social-btn">Specifics</button>
                    </div>
                  </div>
                  <Image src="/assets/lockblock.png" alt="LockBlock" width={200} height={120} className="project-list-image" />
                </div>
              </div>
            )}
            {activeTab !== 'all' && (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h3>{activeTab.toUpperCase()}</h3>
                <p>Content for {activeTab} project goes here...</p>
              </div>
            )}
          </div>
        </>
      ))}

      {/* Taskbar */}
      <div className="taskbar" style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        height: '40px', 
        backgroundColor: '#c0c0c0', 
        borderTop: '2px solid #ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
        zIndex: 1000,
        boxSizing: 'border-box'
      }}>
        <button className="start-button" style={{ 
          height: '30px', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px',
          padding: '0 10px'
        }}>
          <Image src="/assets/directory_computer-0.png" alt="Start" width={20} height={20} />
          Start
        </button>
        
        <div style={{ display: 'flex', gap: '5px', marginLeft: '10px', flex: 1, overflowX: 'auto' }}>
          {windows.map(win => win.isOpen && (
            <button 
              key={win.id}
              className={`taskbar-item ${!win.isMinimized && windows.find(w => w.zIndex === maxZIndex)?.id === win.id ? 'active' : ''}`}
              style={{ 
                height: '30px', 
                minWidth: '100px', 
                textAlign: 'left',
                padding: '0 5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              onClick={() => win.isMinimized ? openWindow(win.id) : bringToFront(win.id)}
            >
              {win.title}
            </button>
          ))}
        </div>

        <div className="status-bar-field" style={{ 
          height: '30px', 
          padding: '0 10px', 
          display: 'flex', 
          alignItems: 'center',
          boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #808080',
          backgroundColor: '#c0c0c0',
          marginLeft: 'auto'
        }}>
          {currentTime}
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'Jersey 10';
          src: url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');
        }
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Jersey 10', sans-serif;
        }
        .win98-desktop {
          background-color: #008080;
          background-image: url('/assets/Backgroundpixels.png');
          background-repeat: repeat;
        }
        .taskbar-item.active {
          box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080 !important;
          background-color: #e6e6e6 !important;
        }
        .window-body {
          background-color: #c0c0c0;
          flex: 1;
          overflow: auto;
        }
        .project-tab.active {
          background-color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
