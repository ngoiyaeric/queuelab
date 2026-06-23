"use client";

import { useRef, useEffect } from 'react';

const VimeoPlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const currentIframe = iframeRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentIframe?.contentWindow?.postMessage('{"method":"play"}', '*');
        } else {
          currentIframe?.contentWindow?.postMessage('{"method":"pause"}', '*');
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (currentIframe) {
      observer.observe(currentIframe);
    }

    return () => {
      if (currentIframe) {
        observer.unobserve(currentIframe);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1014706363?badge=0&autopause=0&player_id=0&app_id=58479&muted=1"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        className="w-full aspect-video"
        title="QCX Demo"
      ></iframe>
    </div>
  );
};

export default VimeoPlayer;
