'use client'

// import { getGoogleReviews } from '@/app/action/GoogleReviews'; // Google Places API reviews disabled — using static reviews below
import { useEffect, useState, useRef } from 'react';

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

export default function GoogleReviews({ placeId }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    // Google Places API reviews fetch disabled — using static reviews instead
    // async function fetchReviews() {
    //   try {
    //     const data = await getGoogleReviews(placeId);
    //     setReviews(data.reviews || []);
    //     setRating(data.rating || 0);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchReviews();

    setReviews(STATIC_REVIEWS);
    setRating(5);
    setLoading(false);
  }, [placeId]);

  // Get number of visible cards based on screen size
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1536) return 5; // 2xl
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2; // md
    return 1; // mobile
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      const cards = getVisibleCards();
      setVisibleCards(cards);
      // Reset to first card on resize to prevent layout issues
      setCurrentIndex(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    };
    
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCards);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && reviews.length > 0) {
      const container = scrollContainerRef.current;
      const cardElements = container.children;
      if (cardElements.length > 0) {
        const firstCard = cardElements[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth + 16; // width + gap
        container.scrollTo({
          left: cardWidth * index,
          behavior: 'smooth'
        });
        setCurrentIndex(Math.min(index, maxIndex));
      }
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  // Handle scroll to update current index
  const handleScroll = () => {
    if (scrollContainerRef.current && reviews.length > 0) {
      const container = scrollContainerRef.current;
      const cardElements = container.children;
      if (cardElements.length > 0) {
        const firstCard = cardElements[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth + 16;
        const scrollPos = container.scrollLeft;
        const newIndex = Math.round(scrollPos / cardWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  // Touch/Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    if (isDragging && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardElements = container.children;
      if (cardElements.length > 0) {
        const firstCard = cardElements[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth + 16;
        const newIndex = Math.round(container.scrollLeft / cardWidth);
        scrollToIndex(Math.max(0, Math.min(maxIndex, newIndex)));
      }
    }
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8">No reviews available.</div>;
  }

  return (
    <div className="relative my-10 sm:my-25 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute -left-4 sm:left-0 top-[50%] z-10 bg-white dark:bg-black shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-100 transition-all"
              aria-label="Previous review"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <h2 className='mb-0 text-xl mb-0 text-center sm:text-3xl font-bold'>Reviews</h2>
          <div className='flex flex-col items-center justify-center'>
            <div className=" text-center flex items-center gap-0 text-xl font-bold">
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC04' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
            <span className='font-light text-md ml-1 px-2'>{rating.toFixed(1)}</span>
            <div className="flex items-end">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
              <span className='font-light text-md px-2'>Rating</span>
            </div>

            </div>
            <a href="https://www.google.com/maps/place/MTA+worldwide+Currency+Exchange+%26+Money+Transfer/@51.4769918,0.3226627,17z/data=!4m8!3m7!1s0x47d8b792e960dbdb:0x19994416c2535aa9!8m2!3d51.4769918!4d0.3226627!9m1!1b1!16s%2Fg%2F11m5fjwvxt?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D" 
            className="text-sm w-50 text-center bg-blue-950 cursor-pointer mt-5 text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            target='_blank'>
                Give a Review
            </a>
            
          </div>

          {/* Reviews Scroll Container */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto py-15 scrollbar-hide snap-x snap-mandatory"
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-none shadow-equal-md rounded-xl"
                style={{ 
                  width: `calc((100% - ${(visibleCards - 1) * 1}rem) / ${visibleCards})`,
                  minWidth: '280px',
                  pointerEvents: isDragging ? 'none' : 'auto'
                }}
              >
                <div className="bg-gray-100/70 rounded-xl p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow snap-start">
                  {/* Author Header */}
                  <div className="flex items-center gap-3 mb-4">
                    {review.authorAttribution.photoUri ? (
                      <img
                        src={review.authorAttribution.photoUri}
                        alt={review.authorAttribution.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-lg">
                          {review.authorAttribution.displayName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {review.authorAttribution.displayName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {review.relativePublishTimeDescription}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 flex-1">
                    {review.text.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hide scrollbar for Webkit browsers */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Right Arrow */}
          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute -right-4 sm:right-0 top-[50%] z-10 bg-white dark:bg-black shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-100 transition-all"
              aria-label="Next review"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Pagination Dots - Only show if there's more than one card visible */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-blue-900' 
                      : 'w-2 bg-gray-200 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}