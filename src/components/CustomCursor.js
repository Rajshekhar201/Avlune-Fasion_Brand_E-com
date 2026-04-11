'use client';

import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Disable strictly on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }
    
    setIsMobile(false);

    let animationFrameId;
    let trailX = -100;
    let trailY = -100;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e) => {
      const target = e.target;
      const isClickable = target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') ||
                          target.closest('button') ||
                          window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        className={`${styles.cursorDot} ${isHovering ? styles.hover : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`${styles.cursorOutline} ${isHovering ? styles.hover : ''}`}
        style={{ transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%))` }}
      />
    </>
  );
}
