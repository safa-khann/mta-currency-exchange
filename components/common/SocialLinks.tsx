const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1BJs9G26mq/?mibextid=wwXIfr',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@mta_moneyexchange?lang=en',
    icon: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3.03.6.08.89.16v-3.24a6.27 6.27 0 0 0-1-.09A6.14 6.14 0 0 0 5 20.1a6.14 6.14 0 0 0 10.86-3.94v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.09z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mta_moneyexchange_transfer?igsh=MTNxNWRmZGhyeXF1Yg%3D%3D&utm_source=qr',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
];

interface SocialLinksProps {
  tone?: 'light' | 'dark';
}

export default function SocialLinks({ tone = 'light' }: SocialLinksProps) {
  const circle =
    tone === 'dark'
      ? 'border-white/15 text-white/80 hover:bg-white hover:text-ink hover:border-white'
      : 'border-line text-ink hover:bg-ink hover:text-white hover:border-ink';

  return (
    <ul className="flex items-center gap-2">
      {socialLinks.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`MTA on ${social.name}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 ${circle}`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d={social.icon} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
