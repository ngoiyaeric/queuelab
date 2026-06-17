import React from 'react';

export const FlowerSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-16 h-16 animate-spin duration-[3000ms]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-4 h-8 bg-blue-400/40 rounded-full blur-[2px]"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-16px)`,
              opacity: 1 - i * 0.1,
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-200/60 rounded-full blur-[4px]" />
      </div>
    </div>
  );
};
