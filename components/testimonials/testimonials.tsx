'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/testimonials/Container'
import Image from 'next/image'

interface Review {
  title: string
  body: string
  author: string
  // rating: 1 | 2 | 3 | 4 | 5
}

const reviews: Array<Review> = [
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
        <p className="mt-4 text-lg/6 font-semibold before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base/7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}


function splitArray<T>(array: Array<T>, numParts: number) {
  let result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
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

  return (
    <div
      ref={columnRef}
      className={clsx('animate-vertical-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
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
  let containerRef = useRef<React.ElementRef<'div'>>(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-4 grid h-[36rem] max-h-[70vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-gray-50" />
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
        <ReviewGrid />

      </Container>

    </section>
  )
}

