import type { ReactNode } from 'react';
import HeroSection from '../common/HeroSection';

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

// Shared layout for long-form legal pages: sticky contents list + readable column.
export default function LegalPage({
  heading,
  description,
  sections,
}: {
  heading: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <HeroSection eyebrow="Legal" heading={heading} description={description} />
      <section className="section pt-12 sm:pt-16">
        <div className="container-page grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="legal max-w-3xl divide-y divide-line">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 py-8 first:pt-0">
                <h2>{section.title}</h2>
                {section.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
