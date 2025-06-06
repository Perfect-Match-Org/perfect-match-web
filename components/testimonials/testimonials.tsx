import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/testimonials/Container'
import Image from 'next/image'
import Link from 'next/link';

interface Review {
  title: string
  body: string
  author: string
  // rating: 1 | 2 | 3 | 4 | 5
}

//Probably can be deleted atp
const fakeReviews: Array<Review> = [
  {
    title: 'I found my soulmate!',
    body: 'I never believed in online dating until I met her on Perfect Match. We clicked instantly and now we’re planning our wedding!',
    author: 'HopelessRomantic23',
  },
  {
    title: 'Love at first swipe!',
    body: 'I thought it was all just a game, but Perfect Match made me realize that true love can be found with the right person. I’m engaged now!',
    author: 'LoveIsReal',
  },
  {
    title: 'Perfect match, perfect life.',
    body: 'I’ve been using dating apps for years, but I never met someone like him. Thanks to Perfect Match, I finally found my other half.',
    author: 'LookingForMyPerson',
  },
  {
    title: 'The one I was waiting for!',
    body: 'After a few weeks on Perfect Match, I met the person I had been dreaming about. We share everything in common and can’t wait for the future together!',
    author: 'MatchMadeInHeaven',
  },
  {
    title: 'Changed my life.',
    body: 'Perfect Match helped me find love when I wasn’t even looking for it. I feel like I’ve known my partner for a lifetime!',
    author: 'UnexpectedlyHappy',
  },
  {
    title: 'I didn’t think it was possible!',
    body: 'We met on Perfect Match, and from the first date, I knew we were meant to be. It’s crazy how fast everything clicked!',
    author: 'SoulmateFinder',
  },
  {
    title: 'True love exists!',
    body: 'I never thought I would find someone who understands me so completely. Thanks to Perfect Match, I now have the love of my life!',
    author: 'EverAfterDreamer',
  },
  {
    title: 'A fairytale come true.',
    body: 'Perfect Match turned my doubts into faith. We’ve been inseparable since we met and our relationship is everything I’ve ever wanted.',
    author: 'FairytaleRomance',
  },
  {
    title: 'Found my forever!',
    body: 'We both swiped right at the same time and now we’re planning our future together. I never thought I’d find someone so perfect!',
    author: 'HappilyEverAfter',
  },
  {
    title: 'A new beginning.',
    body: 'I had given up on finding true love until I found her on Perfect Match. Now, we’re inseparable and have a love I never thought possible.',
    author: 'LoveRestored',
  },
  {
    title: 'The perfect person for me.',
    body: 'We started talking on Perfect Match and instantly hit it off. I feel like I’ve known them forever. Thank you for making my dreams come true!',
    author: 'DreamCouple',
  },
  {
    title: 'Love is real, and so is Perfect Match.',
    body: 'I was skeptical at first, but I’ve never been more grateful for giving Perfect Match a try. I found my one and only.',
    author: 'HeartfeltConnection',
  },
  {
    title: 'Finally met the one.',
    body: 'I was ready to give up on dating until I met him on Perfect Match. It feels like everything just fell into place!',
    author: 'DestinedForYou',
  },
]


function StarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

// function StarRating({ rating }: { rating: Review['rating'] }) {
//   return (
//     <div className="flex">
//       {[...Array(5).keys()].map((index) => (
//         <StarIcon
//           key={index}
//           className={clsx(
//             'h-5 w-5',
//             rating > index ? 'fill-cyan-500' : 'fill-gray-300',
//           )}
//         />
//       ))}
//     </div>
//   )
// }
function Review({
  title,
  body,
  author,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'figure'>, keyof Review> & Review) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl p-6 opacity-0 bg-white border-2 border-blue-800 shadow-md shadow-blue-800',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <p className='mt-4 text-lg/6 font-semibold before:content-["] after:content-["] break-all overflow-wrap-anywhere whitespace-pre-wrap'>
          {title}
        </p>
        <p className="mt-3 text-base/7 break-all overflow-wrap-anywhere whitespace-pre-wrap">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_'] break-all overflow-wrap-anywhere whitespace-pre-wrap">
        {author}
      </figcaption>
    </figure >
  )
}


function splitArray<T>(array: Array<T>, numParts: number) {
  // Handle edge cases
  let result: Array<Array<T>> = Array(numParts).fill(null).map(() => []);
  if (!array || array.length === 0) {
    return result;
  }

  if (numParts <= 0) {
    return [array];
  }

  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    result[index].push(array[i])
  }

  return result
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: Array<Review>
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  let columnRef = useRef<React.ElementRef<'div'>>(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])
  // Handle empty reviews array
  if (!reviews || reviews.length === 0) {
    return <div className={clsx('space-y-8 py-4', className)} />
  }
  // Create seamless infinite scroll by ensuring minimum 4 reviews
  // If we have fewer than 4 reviews, duplicate them to reach at least 4
  while (reviews.length < 4) {
    reviews = [...reviews, ...reviews]
  }

  return (
    <div
      ref={columnRef}
      className={clsx('animate-vertical-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [loading, setLoading] = useState(true);

  let containerRef = useRef<React.ElementRef<'div'>>(null)
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await fetch('/api/reviews?status=approved');
        if (response.ok) {
          const approvedReviews = await response.json();
          // Set reviews regardless of length - could be empty array
          setReviews(approvedReviews || []);
        } else {
          console.warn('Failed to fetch approved reviews');
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching approved reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedReviews();
  }, []);

  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  // Show loading state
  if (loading) {
    return (
      <div className="relative -mx-4 mt-4 grid h-[26rem] max-h-[70vh] place-items-center">
        <div className="text-pmblue-500">Loading reviews...</div>
      </div>
    );
  }

  // Handle case where there are no reviews - show encouraging message
  if (displayReviews.length === 0) {
    return (
      <div className="relative -mx-4 mt-4 grid h-[26rem] max-h-[70vh] place-items-center">
        <div className="text-center">
          <div className="text-2xl text-pmred-500 font-bold mb-2">Awaiting for your review! 💕</div>
          <div className="text-pmblue-500">Be the first to share your Perfect Match success story!</div>
        </div>
      </div>
    );
  }  // Simple and clean column distribution
  let columns = splitArray(displayReviews, 3)
  let column1 = columns[0] || []
  let column2 = columns[1] || []
  let column3 = columns[2] || []

  // Count non-empty columns
  const nonEmptyColumns = [column1, column2, column3].filter(col => col.length > 0).length

  // Dynamic grid classes based on number of reviews
  const getGridClasses = () => {
    if (nonEmptyColumns === 1) {
      return "grid-cols-1 justify-center"
    } else if (nonEmptyColumns === 2) {
      return "grid-cols-1 md:grid-cols-2 justify-center"
    } else {
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative -mx-4 mt-4 grid h-[26rem] max-h-[70vh] ${getGridClasses()} items-start gap-8 overflow-hidden px-4 sm:mt-20`}
    >
      {/* Only render columns that have content */}
      {column1.length > 0 && (
        <ReviewColumn
          reviews={column1}
          msPerPixel={10}
        />
      )}

      {column2.length > 0 && (
        <ReviewColumn
          reviews={column2}
          className={nonEmptyColumns === 2 ? "" : "hidden md:block"}
          msPerPixel={15}
        />
      )}

      {column3.length > 0 && (
        <ReviewColumn
          reviews={column3}
          className="hidden lg:block"
          msPerPixel={10}
        />
      )}
    </div>
  )
}



export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500"
    >
      <Container>
        <h1
          id="reviews-title"
          className="text-3xl text-pmred-500 font-extrabold sm:text-3xl sm:text-center font-dela-gothic">
          This could be you
        </h1>
        <p className="mt-2 text-lg text-pmblue-500 sm:text-center font-delta-gothic font-bold">
          Find the love of your life today.
        </p>
        <div className="flex justify-center">
          <Link href="/write-review">
            <button
              className="
                mt-6
                px-6 
                py-2
                rounded-full
                bg-white 
                text-pmred-500 
                border-4
                border-pmblue-500 
                font-bold
                shadow-[6px_6px_0px_0px_rgba(36,67,141,1)]
                transition-all
                hover:translate-x-[4px]
                hover:translate-y-[4px]
                hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)]
                active:translate-x-[6px]
                active:translate-y-[6px]
                active:shadow-none
                inline-flex 
                items-center            "
            >
              share your experiences
            </button>
          </Link>
        </div>
        <ReviewGrid />
      </Container>
    </section>
  )
}