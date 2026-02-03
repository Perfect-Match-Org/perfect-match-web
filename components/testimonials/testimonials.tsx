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

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 231 184" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M98.0957 132.766C98.0957 143.182 93.8639 152.297 85.4004 160.109C77.0996 167.922 67.2526 171.828 55.8594 171.828C37.9557 171.828 24.2025 165.887 14.5996 154.006C4.99674 142.124 0.195312 125.686 0.195312 104.689C0.195312 85.1582 8.41471 65.4642 24.8535 45.6074C41.4551 25.7507 61.3932 10.6953 84.668 0.441406L95.4102 17.7754C77.0182 26.7272 62.6139 37.1439 52.1973 49.0254C41.7806 60.9069 35.7585 75.3112 34.1309 92.2383H47.8027C57.8939 92.2383 66.1133 93.3776 72.4609 95.6562C78.8086 97.9349 83.9355 101.109 87.8418 105.178C91.5853 109.084 94.1895 113.397 95.6543 118.117C97.2819 122.837 98.0957 127.72 98.0957 132.766ZM218.457 132.766C218.457 143.182 214.225 152.297 205.762 160.109C197.461 167.922 187.614 171.828 176.221 171.828C158.317 171.828 144.564 165.887 134.961 154.006C125.358 142.124 120.557 125.686 120.557 104.689C120.557 85.1582 128.776 65.4642 145.215 45.6074C161.816 25.7507 181.755 10.6953 205.029 0.441406L215.771 17.7754C197.38 26.7272 182.975 37.1439 172.559 49.0254C162.142 60.9069 156.12 75.3112 154.492 92.2383H168.164C178.255 92.2383 186.475 93.3776 192.822 95.6562C199.17 97.9349 204.297 101.109 208.203 105.178C211.947 109.084 214.551 113.397 216.016 118.117C217.643 122.837 218.457 127.72 218.457 132.766Z" fill="currentColor" />
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
        <p className='mt-4 text-lg/6 font-semibold before:content-["] after:content-["] break-words overflow-wrap-anywhere whitespace-pre-wrap'>
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
          <div className="text-2xl text-white font-bold mb-2">Awaiting your review! 💕</div>
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
      className={`relative -mx-4 mt-4 grid h-[34rem] max-h-[70vh] ${getGridClasses()} items-start gap-8 overflow-hidden px-8 sm:px-12 lg:px-16 xl:px-20 sm:mt-10`}
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
      className="pt-12 pb-8 sm:pt-16 sm:pb-12 bg-pmred-500 overflow-hidden"
    >
      <Container>

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="hidden shrink-0 md:block">
              <QuoteIcon
                className="h-20 w-20 text-white drop-shadow-[4px_4px_0px_rgba(36,67,141,1)]"
              />
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h1
                id="reviews-title"
                className="font-dm-sans text-3xl font-bold text-white sm:text-4xl"
              >
                <span className="box-decoration-clone bg-pmblue2-800 px-2 leading-[1.4] text-pmpink-500">
                  Found the love of your life <br className="hidden sm:block" /> through Perfect Match?
                </span>
              </h1>
              <p className="mt-4 font-dm-sans text-xl font-medium text-white">
                We want to hear about it!
              </p>
            </div>
          </div>

          <div className="relative flex justify-center pb-2">
            <StarBurst show={hovering} />
            <Link href="/testimonials">
              <button
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="
                inline-flex
                items-center
                rounded-full
                border-4
                border-pmblue-500
                bg-white
                px-[30px]
                py-2
                text-lg
                font-bold
                text-pmred-500
                shadow-[6px_6px_0px_0px_rgba(36,67,141,1)]
                transition-all
                hover:translate-x-[4px]
                hover:translate-y-[4px]
                hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)]
                active:translate-x-[6px]
                active:translate-y-[6px]
                active:shadow-none"
              >
                spill the tea
              </button>
            </Link>
          </div>
        </div>
        <ReviewGrid />
      </Container>
    </section>
  )
}