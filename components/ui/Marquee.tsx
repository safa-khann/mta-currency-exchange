import type { ReactNode } from 'react';

// Infinite horizontal scroller. Children are rendered twice for a seamless loop.
export default function Marquee({
  children,
  className = '',
  reverse = false,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
}) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
