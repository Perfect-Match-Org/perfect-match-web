import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/testimonials/Container'
import Image from 'next/image'
import Link from 'next/link';
import { StarBurst } from './StarBurst'

interface Review {
  title: string
  body: string
  author: string
  // rating: 1 | 2 | 3 | 4 | 5
}

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
        'animate-fade-in rounded-3xl p-6 opacity-0 bg-white border-2 border-blue-800 shadow-md shadow-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_10px_rgba(36,67,141,0.8)] hover:z-69 relative cursor-pointer',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <p className='mt-4 text-lg/6 font-semibold before:content-["] after:content-["] break-all overflow-wrap-anywhere whitespace-pre-wrap'>
          {title}
        </p>
        <p className="mt-3 text-base/7 break-words overflow-wrap-anywhere whitespace-pre-wrap">{body}</p>
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
  let [isPaused, setIsPaused] = useState(false)
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

  reviews = [...reviews, ...reviews]


  return (
    <div
      ref={columnRef}
      className={clsx('animate-vertical-marquee space-y-8 py-4', className)}
      style={{
        '--marquee-duration': duration,
        animationPlayState: isPaused ? 'paused' : 'running'
      } as React.CSSProperties}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
          <div className="text-2xl text-pmred-500 font-bold mb-2">Awaiting your review! 💕</div>
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
      className={`relative -mx-4 mt-4 grid h-[26rem] max-h-[70vh] ${getGridClasses()} items-start gap-8 overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-20 sm:mt-20`}
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
  const [hovering, setHovering] = useState(false);
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-6 pb-8 sm:pt-2 sm:pb-12 bg-pmpink2-500 overflow-hidden"
    >
      <Container>
        <div className="relative h-[175px]">
          <div className="absolute top-[-25px] right-[-4%] sm:top-[-40px] sm:right-[18%] z-0 pointer-events-none w-[250px] md:w-[300px]">
            <Image
              src="/six-hearts.svg"
              alt="six hearts"
              width={300}
              height={300}
            />
          </div>
          <div className="absolute top-[60px] right-[72%] sm:top-[40px] sm:right-[61.25%] z-0 pointer-events-none w-[100px] md:w-[125px]">
            <Image
              src="/big-quote.svg"
              alt="big quote"
              width={125}
              height={125}
            />
          </div>
        </div>
        <h1
          id="reviews-title"
          className="text-3xl text-pmred-500 sm:text-4xl text-center font-dela-gothic">
          Found the love of your life <br className="hidden sm:block" /> through Perfect Match?
        </h1>
        <p className="text-3xl mt-4 text-pmblue-500 text-center font-delta-gothic font-bold">
          We want to hear about it!
        </p>
        <div className="relative flex justify-center">
          <StarBurst show={hovering} />
          <Link href="/testimonials">
            <button
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="
                mt-6
                px-[30px]
                py-4
                text-[20px]
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
                items-center"
            >
              testimonials
            </button>
          </Link>
        </div>
        <ReviewGrid />
      </Container>
    </section>
  )
}