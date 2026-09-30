import Image from "next/image";

interface MoneyTransferProps {
  showAuth?: boolean;
  showGlobalPartners?: boolean;
}

const partners = [
  { src: '/images/moneygram logo.png', alt: 'MoneyGram', width: 1024, height: 217, className: 'h-7 sm:h-8' },
  { src: '/images/western union.png', alt: 'Western Union', width: 1080, height: 262, className: 'h-7 sm:h-8' },
  { src: '/images/riya-money-transfer.png', alt: 'Ria Money Transfer', width: 309, height: 163, className: 'h-14 sm:h-16' },
];

const regulators = [
  { src: '/images/fca.png', alt: 'Authorised by the Financial Conduct Authority', width: 252, height: 96, className: 'h-9 sm:h-10' },
  { src: '/images/hmm.png', alt: 'Registered with HM Revenue & Customs', width: 670, height: 220, className: 'h-11 sm:h-12' },
];

function LogoRow({ label, logos }: { label: string; logos: typeof partners }) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
      <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-subtle md:w-36">{label}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-start">
        {logos.map((logo) => (
          <li key={logo.alt} className="flex h-16 items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              loading="eager"
              className={`${logo.className} w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Logo strip for money transfer partners and regulators.
const MoneyTransferComp: React.FC<MoneyTransferProps> = ({ showAuth, showGlobalPartners }) => {
  return (
    <div id="money-transfer" className="space-y-8">
      {showGlobalPartners && <LogoRow label="Global partners" logos={partners} />}
      {showAuth && showGlobalPartners && <div className="h-px bg-line" />}
      {showAuth && <LogoRow label="Authorised by" logos={regulators} />}
    </div>
  );
};

export default MoneyTransferComp;
