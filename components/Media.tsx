'use client'
import { useEffect, useRef } from 'react';

export default function Media({ srcPoster, children, className = '' }: { srcPoster?: string, children?: React.ReactNode, className?: string }){
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(()=>{ if(ref.current){ ref.current.play().catch(()=>{}); } },[]);
  return (
    <div className={`relative aspect-[16/10] bg-muted overflow-hidden rounded-2xl ${className}`}>
      <video ref={ref} className="w-full h-full object-cover" muted loop playsInline preload="metadata" poster={srcPoster}>
        {children}
      </video>
    </div>
  );
}
