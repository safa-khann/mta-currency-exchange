'use client'

// Google Places API reviews are disabled — static reviews are used instead.
// The server action in app/action/GoogleReviews.ts is kept for when it is re-enabled.
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { buttonClasses } from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';
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

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
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
  const rating = 5;
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLUListElement>(null);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [reviews, updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  if (reviews.length === 0) {
    return null;
  }

  const arrowClass =
    'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink disabled:cursor-default disabled:opacity-35 disabled:hover:border-line';

  return (
    <div data-place-id={placeId}>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Reviews"
          title="Trusted by customers across Grays"
          description={
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
              <Stars rating={rating} />
              <span>on Google</span>
            </span>
          }
        />
        <div className="flex items-center gap-3">
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses('secondary', 'md')}>
            Write a review
          </a>
          <button type="button" className={arrowClass} onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous reviews">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" className={arrowClass} onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next reviews">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={updateArrows}
        className="scrollbar-none -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {reviews.map((review, index) => (
          <li
            key={index}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-card border border-line bg-white p-6 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <Stars rating={review.rating} />
            <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink">
              “{review.text.text.replace(/\s*…$/, '')}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas text-sm font-semibold text-navy-soft">
                {review.authorAttribution.displayName.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium text-ink">{review.authorAttribution.displayName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
