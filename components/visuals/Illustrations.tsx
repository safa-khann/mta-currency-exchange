// Bespoke brand illustrations, drawn in SVG so they stay crisp and on-palette.
// Colours: navy #111d52 / #1d2d78, abyss #050a24, gold #f7c21a, frost #e9eeff.

const NAVY = '#111d52';
const NAVY_SOFT = '#1d2d78';
const INK = '#0a1233';
const GOLD = '#f7c21a';
const GOLD_DEEP = '#e2aa00';
const FROST = '#e9eeff';

/* ------------------------------------------------------------------ */
/* Banknote fan                                                        */
/* ------------------------------------------------------------------ */

function Note({
  symbol,
  fill,
  ink,
  accent,
  label,
  id,
}: {
  symbol: string;
  fill: string;
  ink: string;
  accent: string;
  label: string;
  id: string;
}) {
  return (
    <g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect width="300" height="160" rx="18" />
        </clipPath>
      </defs>
      <rect width="300" height="160" rx="18" fill={fill} />
      <g clipPath={`url(#clip-${id})`} fill="none" stroke={accent} strokeOpacity="0.35">
        {/* guilloche rosette */}
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="232" cy="80" r={14 + i * 9} strokeWidth="1" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={`e${i}`} cx="232" cy="80" rx="62" ry="22" transform={`rotate(${i * 15} 232 80)`} strokeWidth="0.8" />
        ))}
        <path d="M0 132 Q 75 112 150 132 T 300 132" strokeWidth="1.2" />
        <path d="M0 142 Q 75 122 150 142 T 300 142" strokeWidth="1.2" />
      </g>
      <rect x="10" y="10" width="280" height="140" rx="12" fill="none" stroke={ink} strokeOpacity="0.25" strokeDasharray="2 4" />
      <text x="28" y="66" fontSize="54" fontWeight="700" fill={ink} fontFamily="inherit">
        {symbol}
      </text>
      <text x="30" y="92" fontSize="11" fontWeight="700" letterSpacing="3" fill={ink} fillOpacity="0.7" fontFamily="inherit">
        {label}
      </text>
      <circle cx="232" cy="80" r="26" fill={accent} />
      <circle cx="232" cy="80" r="26" fill="none" stroke={ink} strokeOpacity="0.25" strokeWidth="1" />
      <text x="232" y="86" fontSize="16" fontWeight="800" textAnchor="middle" fill={ink} fontFamily="inherit">
        MTA
      </text>
      <text x="30" y="124" fontSize="9" fontWeight="600" letterSpacing="2" fill={ink} fillOpacity="0.55" fontFamily="inherit">
        0% COMMISSION · GRAYS
      </text>
    </g>
  );
}

function Coin({ x, y, r = 30, symbol = '£' }: { x: number; y: number; r?: number; symbol?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="6" rx={r} ry={r * 0.95} fill={GOLD_DEEP} />
      <circle cx="0" cy="0" r={r} fill={GOLD} />
      <circle cx="0" cy="0" r={r - 6} fill="none" stroke={INK} strokeOpacity="0.25" strokeDasharray="2 3" />
      <text x="0" y={r * 0.36} fontSize={r} fontWeight="800" textAnchor="middle" fill={INK} fontFamily="inherit">
        {symbol}
      </text>
    </g>
  );
}

export function NotesFan({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="30 30 480 400" className={className} role="img" aria-label="Illustration of pound, dollar and euro banknotes">
      <defs>
        <radialGradient id="notes-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <filter id="notes-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <circle cx="260" cy="230" r="200" fill="url(#notes-glow)" />
      <g filter="url(#notes-shadow)">
        <g transform="translate(60 190) rotate(-24 150 80)">
          <Note id="eur" symbol="€" label="EURO" fill={NAVY_SOFT} ink={FROST} accent={FROST} />
        </g>
        <g transform="translate(112 140) rotate(-9 150 80)">
          <Note id="usd" symbol="$" label="US DOLLAR" fill={FROST} ink={INK} accent={NAVY_SOFT} />
        </g>
        <g transform="translate(168 86) rotate(8 150 80)">
          <Note id="gbp" symbol="£" label="POUND STERLING" fill={GOLD} ink={INK} accent={FROST} />
        </g>
      </g>
      <Coin x={112} y={372} r={34} />
      <Coin x={170} y={394} r={26} symbol="$" />
      <Coin x={466} y={96} r={24} symbol="€" />
      {/* sparkles */}
      {[
        [470, 250, 10],
        [78, 120, 8],
        [400, 360, 7],
      ].map(([x, y, s]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - s} L${x + s * 0.28} ${y - s * 0.28} L${x + s} ${y} L${x + s * 0.28} ${y + s * 0.28} L${x} ${y + s} L${x - s * 0.28} ${y + s * 0.28} L${x - s} ${y} L${x - s * 0.28} ${y - s * 0.28} Z`}
          fill={GOLD}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Transfer globe                                                      */
/* ------------------------------------------------------------------ */

export function TransferGlobe({ className = '' }: { className?: string }) {
  // UK origin and destinations on the front face of the globe.
  const origin = { x: 238, y: 150 };
  const dests = [
    { x: 330, y: 245, label: 'EUR' },
    { x: 140, y: 250, label: 'USD' },
    { x: 360, y: 150, label: 'TRY' },
    { x: 300, y: 330, label: 'AED' },
    { x: 170, y: 340, label: 'CAD' },
  ];
  return (
    <svg viewBox="0 0 480 480" className={className} role="img" aria-label="Illustration of money being sent around the world from the UK">
      <defs>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor={NAVY_SOFT} />
          <stop offset="100%" stopColor="#060c2c" />
        </radialGradient>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor={GOLD} stopOpacity="0.25" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <clipPath id="globe-clip">
          <circle cx="240" cy="240" r="170" />
        </clipPath>
      </defs>
      <circle cx="240" cy="240" r="225" fill="url(#globe-glow)" />
      <circle cx="240" cy="240" r="170" fill="url(#globe-fill)" />
      <g clipPath="url(#globe-clip)" fill="none" stroke={FROST} strokeOpacity="0.14">
        {[-120, -80, -40, 0, 40, 80, 120].map((dy) => (
          <ellipse key={`lat${dy}`} cx="240" cy={240 + dy} rx={Math.sqrt(170 * 170 - dy * dy)} ry={18 - Math.abs(dy) / 10} />
        ))}
        {[20, 60, 100, 140, 170].map((rx) => (
          <ellipse key={`lon${rx}`} cx="240" cy="240" rx={rx} ry="170" />
        ))}
      </g>
      <circle cx="240" cy="240" r="170" fill="none" stroke={FROST} strokeOpacity="0.25" />
      {/* orbit ring */}
      <ellipse cx="240" cy="240" rx="215" ry="62" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeDasharray="3 7" transform="rotate(-18 240 240)" />

      {/* arcs */}
      {dests.map((d, i) => {
        const mx = (origin.x + d.x) / 2;
        const my = Math.min(origin.y, d.y) - 70 - i * 6;
        const path = `M${origin.x} ${origin.y} Q ${mx} ${my} ${d.x} ${d.y}`;
        return (
          <g key={d.label}>
            <path d={path} fill="none" stroke={GOLD} strokeOpacity="0.45" strokeWidth="2" />
            <path d={path} fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" strokeDasharray="18 232" className="animate-[dash_3s_linear_infinite]" style={{ animationDelay: `${i * 0.45}s` }} />
            <circle cx={d.x} cy={d.y} r="9" fill={GOLD} fillOpacity="0.25" />
            <circle cx={d.x} cy={d.y} r="4.5" fill={GOLD} />
            <rect x={d.x + 10} y={d.y - 12} width="42" height="22" rx="11" fill={FROST} />
            <text x={d.x + 31} y={d.y + 3} fontSize="10" fontWeight="700" textAnchor="middle" fill={INK} fontFamily="inherit">
              {d.label}
            </text>
          </g>
        );
      })}

      {/* origin: Grays, UK */}
      <circle cx={origin.x} cy={origin.y} r="16" fill={GOLD} fillOpacity="0.25" className="animate-ping [transform-box:fill-box] [transform-origin:center]" />
      <circle cx={origin.x} cy={origin.y} r="7" fill={GOLD} stroke={INK} strokeWidth="2" />
      <rect x={origin.x - 64} y={origin.y - 48} width="80" height="26" rx="13" fill={GOLD} />
      <text x={origin.x - 24} y={origin.y - 31} fontSize="11" fontWeight="800" textAnchor="middle" fill={INK} fontFamily="inherit">
        GRAYS, UK
      </text>

      {/* paper plane */}
      <g transform="translate(378 88) rotate(18)">
        <path d="M0 0 L46 16 L0 32 L10 16 Z" fill={FROST} />
        <path d="M10 16 L46 16 L0 32 Z" fill="#c8d2f5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Branch shopfront                                                    */
/* ------------------------------------------------------------------ */

export function Shopfront({ className = '' }: { className?: string }) {
  const stripes = Array.from({ length: 10 });
  return (
    <svg viewBox="0 0 480 440" className={className} role="img" aria-label="Illustration of the MTA Currency Exchange branch on Grays High Street">
      <defs>
        <radialGradient id="shop-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a3d9a" />
          <stop offset="100%" stopColor={NAVY} />
        </linearGradient>
      </defs>
      <circle cx="240" cy="250" r="210" fill="url(#shop-glow)" />

      {/* building */}
      <rect x="60" y="92" width="360" height="300" rx="10" fill={FROST} />
      <rect x="60" y="92" width="360" height="300" rx="10" fill="none" stroke={INK} strokeOpacity="0.15" />
      {/* upper windows */}
      {[92, 212, 332].map((x) => (
        <g key={x}>
          <rect x={x} y="112" width="56" height="44" rx="6" fill="url(#glass)" />
          <path d={`M${x + 8} ${148} L${x + 30} ${120}`} stroke={FROST} strokeOpacity="0.25" strokeWidth="6" />
        </g>
      ))}
      {/* sign */}
      <rect x="84" y="170" width="312" height="46" rx="10" fill={INK} />
      <circle cx="112" cy="193" r="15" fill={FROST} />
      <image href="/images/logo-wid.png" x="99" y="180" width="26" height="26" />
      <text x="134" y="199" fontSize="17" fontWeight="800" fill={GOLD} fontFamily="inherit">
        MTA
      </text>
      <text x="178" y="199" fontSize="12" fontWeight="600" letterSpacing="2" fill={FROST} fontFamily="inherit">
        CURRENCY EXCHANGE
      </text>
      {/* awning */}
      <g>
        {stripes.map((_, i) => (
          <path
            key={i}
            d={`M${72 + i * 33.6} 224 h33.6 l-4 34 a14 14 0 0 1 -25.6 0 z`}
            fill={i % 2 === 0 ? GOLD : NAVY}
          />
        ))}
      </g>
      {/* shop windows */}
      <rect x="86" y="272" width="120" height="104" rx="6" fill="url(#glass)" />
      <rect x="274" y="272" width="120" height="104" rx="6" fill="url(#glass)" />
      {/* rate board in window */}
      <rect x="98" y="284" width="96" height="58" rx="5" fill={INK} />
      {[
        ['USD', '1.32'],
        ['EUR', '1.14'],
        ['TRY', '57.0'],
      ].map(([c, r], i) => (
        <g key={c}>
          <text x="106" y={300 + i * 16} fontSize="10" fontWeight="700" fill={FROST} fontFamily="inherit">
            {c}
          </text>
          <text x="186" y={300 + i * 16} fontSize="10" fontWeight="700" textAnchor="end" fill={GOLD} fontFamily="inherit">
            {r}
          </text>
        </g>
      ))}
      <rect x="286" y="296" width="96" height="30" rx="15" fill={GOLD} />
      <text x="334" y="315" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={INK} fontFamily="inherit">
        0% COMMISSION
      </text>
      {/* door */}
      <rect x="216" y="272" width="48" height="120" rx="4" fill={NAVY} />
      <rect x="222" y="280" width="36" height="58" rx="3" fill="url(#glass)" />
      <circle cx="254" cy="348" r="3" fill={GOLD} />
      <rect x="222" y="352" width="36" height="12" rx="2" fill={GOLD} />
      <text x="240" y="361" fontSize="7" fontWeight="800" textAnchor="middle" fill={INK} fontFamily="inherit">
        OPEN
      </text>
      {/* pavement */}
      <rect x="30" y="392" width="420" height="12" rx="6" fill={FROST} fillOpacity="0.25" />
      {/* plant */}
      <rect x="400" y="360" width="26" height="32" rx="4" fill={GOLD_DEEP} />
      <circle cx="406" cy="352" r="12" fill="#1f8a5f" />
      <circle cx="420" cy="346" r="14" fill="#23a06d" />
      {/* map pin */}
      <g className="animate-float">
        <path d="M240 18 c-26 0 -44 19 -44 42 c0 30 44 66 44 66 s44 -36 44 -66 c0 -23 -18 -42 -44 -42 z" fill={GOLD} />
        <circle cx="240" cy="60" r="17" fill={INK} />
        <circle cx="240" cy="60" r="7" fill={GOLD} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Legal document                                                      */
/* ------------------------------------------------------------------ */

export function LegalDoc({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 380" className={className} role="img" aria-label="Illustration of a signed document with a seal">
      <defs>
        <radialGradient id="doc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.3" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="190" r="180" fill="url(#doc-glow)" />
      <g transform="rotate(-6 210 190)">
        <rect x="96" y="40" width="220" height="290" rx="18" fill={NAVY_SOFT} />
      </g>
      <rect x="110" y="34" width="220" height="290" rx="18" fill={FROST} />
      <rect x="138" y="68" width="120" height="14" rx="7" fill={INK} />
      {[104, 126, 148, 170, 192, 214, 236].map((y, i) => (
        <rect key={y} x="138" y={y} width={i % 3 === 2 ? 110 : 164} height="8" rx="4" fill={INK} fillOpacity="0.15" />
      ))}
      <path d="M140 286 c14 -18 22 6 34 -8 s16 -10 26 2" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* seal */}
      <g transform="translate(300 268)">
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={Math.cos((i / 16) * Math.PI * 2) * 40} cy={Math.sin((i / 16) * Math.PI * 2) * 40} r="9" fill={GOLD} />
        ))}
        <circle r="40" fill={GOLD} />
        <circle r="30" fill="none" stroke={INK} strokeOpacity="0.3" strokeDasharray="2 3" />
        <path d="M-13 1 l9 9 l18 -19" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-22 34 l-8 40 l18 -10 l12 16 l4 -42" fill={GOLD_DEEP} />
        <path d="M22 34 l8 40 l-18 -10 l-12 16 l-4 -42" fill={GOLD_DEEP} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Empty order                                                         */
/* ------------------------------------------------------------------ */

export function EmptyOrder({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 110" className={className} aria-hidden="true">
      <g transform="rotate(-10 80 55)">
        <rect x="26" y="30" width="100" height="54" rx="8" fill={FROST} stroke={INK} strokeOpacity="0.15" />
      </g>
      <rect x="34" y="26" width="100" height="54" rx="8" fill="#fff" stroke={INK} strokeOpacity="0.2" />
      <circle cx="108" cy="53" r="12" fill={GOLD} />
      <text x="108" y="58" fontSize="13" fontWeight="800" textAnchor="middle" fill={INK} fontFamily="inherit">
        £
      </text>
      <rect x="44" y="40" width="34" height="6" rx="3" fill={INK} fillOpacity="0.15" />
      <rect x="44" y="52" width="24" height="6" rx="3" fill={INK} fillOpacity="0.1" />
      <path d="M130 18 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill={GOLD} />
    </svg>
  );
}
