import Image from 'next/image';
import Flag from './Flag';

const inner = ['us', 'eu', 'tr', 'ae'];
const outer = ['ca', 'au', 'sa', 'qa', 'ro', 'gb'];

function Ring({
  flags,
  size,
  reverse = false,
  flagClass,
}: {
  flags: string[];
  size: string;
  reverse?: boolean;
  flagClass: string;
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-frost/20 ${size}`}
    >
      <div className={`absolute inset-0 ${reverse ? 'animate-spin-slow-reverse' : 'animate-spin-slow'}`}>
        {flags.map((country, i) => {
          const angle = (360 / flags.length) * i;
          return (
            <div
              key={country}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateX(var(--r))` }}
            >
              <div
                className=""
                style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
              >
                <div className={reverse ? 'animate-spin-slow' : 'animate-spin-slow-reverse'}>
                  <Flag country={country} className={flagClass} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// The MTA globe with currencies orbiting it — the hero illustration.
export default function GlobeOrbit({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full ${className}`} aria-hidden="true">
      <div className="absolute inset-[18%] rounded-full bg-gold/30 blur-3xl" />
      <div className="[--r:9.5rem] sm:[--r:11.5rem]">
        <Ring flags={outer} size="h-[19rem] w-[19rem] sm:h-[23rem] sm:w-[23rem]" flagClass="[--f:2.5rem] sm:[--f:3rem] shadow-float" />
      </div>
      <div className="[--r:5.75rem] sm:[--r:7rem]">
        <Ring flags={inner} size="h-[11.5rem] w-[11.5rem] sm:h-[14rem] sm:w-[14rem]" reverse flagClass="[--f:2rem] sm:[--f:2.5rem] shadow-float" />
      </div>
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-frost shadow-glow sm:h-32 sm:w-32">
        <Image src="/images/logo-wid.png" alt="" width={86} height={82} className="h-20 w-auto animate-[spin_24s_linear_infinite] sm:h-24" />
      </div>
    </div>
  );
}
