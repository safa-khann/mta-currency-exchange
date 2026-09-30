'use client'

// Google Places API reviews are disabled — static reviews are used instead.
// The server action in app/action/GoogleReviews.ts is kept for when it is re-enabled.
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { buttonClasses } from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';
import { site } from '@/lib/site';

interface Review {
  authorAttribution: {
    displayName: string;
    photoUri?: string;
  };
  text: {
    text: string;
  };
  rating: number;
  relativePublishTimeDescription: string;
}

interface GoogleReviewsProps {
  placeId: string;
}

const STATIC_REVIEWS: Review[] = [
  { authorAttribution: { displayName: 'Ahmz' }, text: { text: 'Great service and very friendly staff. highly recommend for best rates' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Jeffrey Ebhota' }, text: { text: 'The reception is very friendly and accommodating when attending to me. This is one of the best centre I have ever been too.' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'teresa Asprilla' }, text: { text: 'Best exchange rate for sale euro .' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Isabella Souza' }, text: { text: 'A great place to misplace money, polite and nice people' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Efim Mocanu' }, text: { text: 'I always use for ria payouts. Highly recommend' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Shyqyri' }, text: { text: 'Best exhange rate' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Eli' }, text: { text: 'Best exchange shop in grays' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Nozrul Islam' }, text: { text: 'Very polite staff.thanks guys' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Faisal Khan' }, text: { text: 'Great service, recently used to send money through western union, money transfered within seconds. I will definitely use again in future. Thanks adeel' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Simon Kidane' }, text: { text: "It's good customer service very friendly" }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Deandra Senior' }, text: { text: 'Things agwaan fi the shop great service blessings everytime 😊🙏 …' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Silvia Cabral' }, text: { text: 'always use them services.many thanks' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'M Daniel' }, text: { text: 'Just exchanged my euros today and got the best rates here very satisfactory and good customer service as well.' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Eugen' }, text: { text: 'So services. Highly recommended' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Elena Topada' }, text: { text: 'Very good moneygram .. very good expiriance' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Darinel Reyes jaquez' }, text: { text: 'Good man' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Michael Ekama' }, text: { text: 'Great service' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Denis Asya' }, text: { text: 'Very good' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Costy Homea' }, text: { text: 'Best exchange rate .' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Cristi Tudor' }, text: { text: 'Good rates for money transfer and exchange' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Meryem Mimi' }, text: { text: 'Highly recommended for exchange currency' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Sasho Andonoww' }, text: { text: 'Come all the way from basildon for payout.thanks adeel' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Mustapha Saho' }, text: { text: 'Good rate for Gambia.' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Cephas Zindoga' }, text: { text: 'Bedtime saves at all times' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Tahir Javed' }, text: { text: 'Excellent service.best rates in grays' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Shauqat Ali' }, text: { text: 'Best exchange rate in grays' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Shribas Halder' }, text: { text: 'Best rate in bangladesh currency in the shop.' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Maninder Kaur' }, text: { text: 'Good rate for India' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Bobby James Asante' }, text: { text: 'Good job' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'โชติกา บุญญเดชนนท์' }, text: { text: 'Good sw' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Ali Amirr' }, text: { text: 'Five stars service' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'the_best_21 21' }, text: { text: 'Good service' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'Rifat Dilek' }, text: { text: 'Top services' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'GARY Brown' }, text: { text: 'Yam man' }, rating: 5, relativePublishTimeDescription: '' },
  { authorAttribution: { displayName: 'madiana Munu' }, text: { text: 'Fast and secure.' }, rating: 5, relativePublishTimeDescription: '' },
];

// Featured on the site: the reviews that say something specific.
const FEATURED_MIN_LENGTH = 26;
const FEATURED_REVIEWS = STATIC_REVIEWS.filter((review) => review.text.text.length >= FEATURED_MIN_LENGTH);
const RATING = 5;

// Decorative initials floating around the quote (desktop only).
const FLOATERS = [
  { pos: 'left-[6%] top-[8%]', size: 'h-20 w-20 text-2xl', tone: 'bg-gold text-ink' },
  { pos: 'left-[2%] top-[52%]', size: 'h-14 w-14 text-lg', tone: 'bg-ink text-gold' },
  { pos: 'left-[12%] bottom-[4%]', size: 'h-24 w-24 text-3xl', tone: 'bg-navy-soft text-frost' },
  { pos: 'right-[5%] top-[4%]', size: 'h-24 w-24 text-3xl', tone: 'bg-ink text-frost' },
  { pos: 'right-[10%] top-[48%]', size: 'h-16 w-16 text-xl', tone: 'bg-gold text-ink' },
  { pos: 'right-[3%] bottom-[8%]', size: 'h-14 w-14 text-lg', tone: 'bg-navy-soft text-gold' },
];

function Stars({ rating, className = 'h-5 w-5' }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'fill-line text-line'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function GoogleReviews({ placeId }: GoogleReviewsProps) {
  const reviews = FEATURED_REVIEWS;
  const [index, setIndex] = useState(0);

  if (reviews.length === 0) {
    return null;
  }

  const review = reviews[index];
  const go = (next: number) => setIndex((next + reviews.length) % reviews.length);
  const floaterNames = reviews.filter((_, i) => i !== index).slice(0, FLOATERS.length);

  return (
    <div data-place-id={placeId} className="relative">
      {FLOATERS.map((f, i) => (
        <span
          key={f.pos}
          className={`absolute hidden animate-float items-center justify-center rounded-full font-semibold shadow-float lg:flex ${f.pos} ${f.size} ${f.tone}`}
          style={{ animationDelay: `${i * 0.7}s` }}
          aria-hidden="true"
        >
          {floaterNames[i]?.authorAttribution.displayName.charAt(0).toUpperCase()}
        </span>
      ))}

      <div className="relative mx-auto max-w-3xl text-center">
        <Eyebrow>Google reviews</Eyebrow>
        <h2 className="text-headline mt-6 text-ink">What customers say about MTA</h2>
        <div className="mt-6 flex items-center justify-center gap-3 text-muted">
          <span className="text-xl font-semibold text-ink">{RATING.toFixed(1)}</span>
          <Stars rating={RATING} />
          <span>on Google</span>
        </div>

        <figure className="mt-14" aria-live="polite">
          <Quote className="mx-auto h-10 w-10 fill-gold text-gold" aria-hidden="true" />
          <blockquote
            key={index}
            className="mt-6 min-h-[7.5rem] animate-fade-up text-2xl font-medium leading-snug tracking-[-0.02em] text-ink sm:text-3xl"
          >
            “{review.text.text.replace(/\s*…$/, '')}”
          </blockquote>
          <figcaption className="mt-8 inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 ring-1 ring-inset ring-ink/15">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-semibold text-gold">
              {review.authorAttribution.displayName.charAt(0).toUpperCase()}
            </span>
            <span className="text-left">
              <span className="block font-semibold text-ink">{review.authorAttribution.displayName}</span>
              <span className="block text-xs text-muted">Verified Google review</span>
            </span>
          </figcaption>
        </figure>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-ink p-1.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-frost transition-colors hover:bg-frost/10"
              aria-label="Previous review"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="tabular min-w-20 px-2 text-sm font-semibold text-frost">
              <span className="text-gold">{String(index + 1).padStart(2, '0')}</span> / {String(reviews.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gold text-ink transition-colors hover:bg-white"
              aria-label="Next review"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('secondary', 'md', 'h-[3.25rem]')}>
            Write a review
          </a>
        </div>
      </div>
    </div>
  );
}
