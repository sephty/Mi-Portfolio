import React, { useEffect, useState } from 'react';

export const ShardTransition = ({ isTriggered, onMidpoint, onComplete }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setAnimating(true);

      // Midpoint: switch content while screen is covered by shards
      const midTimer = setTimeout(() => {
        if (onMidpoint) onMidpoint();
      }, 160);

      // Complete: remove shard overlay
      const endTimer = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete();
      }, 340);

      return () => {
        clearTimeout(midTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isTriggered]);

  if (!animating && !isTriggered) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex flex-col justify-center">
      {/* Layer 1: Indigo Core */}
      <div
        className="absolute inset-0 bg-indigo-core transform transition-transform"
        style={{
          clipPath: 'polygon(0% 0%, 110% 0%, 95% 100%, 0% 100%)',
          animation: 'shardWipe 330ms cubic-bezier(0.65, 0, 0.2, 1) forwards',
          animationDelay: '0ms'
        }}
      />

      {/* Layer 2: Deep Void Black */}
      <div
        className="absolute inset-0 bg-bg-ink transform transition-transform"
        style={{
          clipPath: 'polygon(0% 0%, 112% 0%, 92% 100%, 0% 100%)',
          animation: 'shardWipe 330ms cubic-bezier(0.65, 0, 0.2, 1) forwards',
          animationDelay: '40ms'
        }}
      />

      {/* Layer 3: Aged Parchment Bone */}
      <div
        className="absolute inset-0 bg-parchment transform transition-transform"
        style={{
          clipPath: 'polygon(0% 0%, 115% 0%, 88% 100%, 0% 100%)',
          animation: 'shardWipe 330ms cubic-bezier(0.65, 0, 0.2, 1) forwards',
          animationDelay: '80ms'
        }}
      />

      {/* Layer 4: Emperor Crimson */}
      <div
        className="absolute inset-0 bg-emperor-crimson transform transition-transform"
        style={{
          clipPath: 'polygon(0% 0%, 120% 0%, 85% 100%, 0% 100%)',
          animation: 'shardWipe 330ms cubic-bezier(0.65, 0, 0.2, 1) forwards',
          animationDelay: '120ms'
        }}
      />

      <style>{`
        @keyframes shardWipe {
          0% {
            transform: translate3d(-105%, 0, 0) skewX(-12deg);
          }
          48% {
            transform: translate3d(0%, 0, 0) skewX(-6deg);
          }
          100% {
            transform: translate3d(105%, 0, 0) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  );
};
