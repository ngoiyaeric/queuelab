"use client";

import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const YouTubePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ padding: '56.25% 0 0 0', position: 'relative', width: '100%', height: '100%' }}>
      <ReactPlayer
        src="https://www.youtube.com/watch?v=y8M6qaFeZOw"
        playing={isPlaying}
        muted={true}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          youtube: {
            playerVars: {
              autoplay: 0,
              modestbranding: 1,
              rel: 0,
            },
          } as any,
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
