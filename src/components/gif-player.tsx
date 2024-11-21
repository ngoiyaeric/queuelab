import React, { useEffect, useRef } from 'react';

const GifPlayer = ({ src, alt }) => {
  const gifRef = useRef(null);

  useEffect(() => {
    const gifElement = gifRef.current;

    const handleMouseEnter = () => {
      gifElement.src = src;
    };

    const handleMouseLeave = () => {
      gifElement.src = '';
    };

    gifElement.addEventListener('mouseenter', handleMouseEnter);
    gifElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      gifElement.removeEventListener('mouseenter', handleMouseEnter);
      gifElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [src]);

  return <img ref={gifRef} alt={alt} />;
};

export default GifPlayer;
