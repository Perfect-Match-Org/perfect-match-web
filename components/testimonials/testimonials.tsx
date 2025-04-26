'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/testimonials/Container'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '../general'

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
      className="relative -mx-4 mt-4 grid h-[26rem] max-h-[70vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
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
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-gray-50" /> */}
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
          <Link href="/statistics">
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
              Share Your Experiences
            </button>
          </Link>
        </div>
        <ReviewGrid />
      </Container>
    </section>
  )
}


interface pendingReview {
  id: string;
  title: string;
  body: string;
  author: string;
}
export function Approvals() {
  // A lot of stuff is related to backend yet which hasn't been implemented
  // So I commented out the backend related stuff and just hardcoded in
  // Examples of what should happen and whatnot.
  // const [pendingReviews, setPendingReviews] = useState<pendingReview[]>([]);

  //Simulation code to generate a list. To be removed
  const [pendingReviews, setPendingReviews] = useState<pendingReview[]>([
    { id: '1', title: 'Great app!', body: 'Loved it.', author: 'John' },
    { id: '2', title: 'Amazing experience', body: 'Found my soulmate!', author: 'Jane' },
    { id: '3', title: 'Life changing platform', body: 'Met my perfect match in just 2 weeks. The algorithm is amazing!', author: 'Mike S.' },
    {
      id: '4', title: 'Best dating app ever', body: 'I was skeptical at first but now I am getting married to someone I met here!', author: 'Sarah'
    },
    { id: '5', title: 'Thank you Perfect Match!', body: 'After years of failed relationships, I finally found someone who truly understands me.', author: 'Alex P.' },
  ]);

  // Add state to track the current review index
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  async function approveReview(id: string) {
    console.log("Approved review with ID:", id)
    //commented out as backend endpointis aren't set yet
    // await fetch(`/api/approve-review?id=${id}`, { method: 'POST' });

    //Simulation code to remove it from list. To be removed
    setPendingReviews((reviews) => reviews.filter((r) => r.id !== id));
    alert(`Review by ${pendingReviews.find(r => r.id === id)?.author} approved!`);

    // Reset index if we're at the end and there are still reviews left
    if (currentReviewIndex >= pendingReviews.length - 1 && pendingReviews.length > 1) {
      setCurrentReviewIndex(0);
    }
  }

  async function rejectReview(id: string) {
    console.log("Denied review with ID:", id)
    //commented out as backend endpointis aren't set yet
    // await fetch(`api/reject-review?id=${id}`, {method: 'POST'});

    //Removes review fromm list
    setPendingReviews((reviews) => reviews.filter((r) => r.id !== id));
    alert(`Review by ${pendingReviews.find(r => r.id === id)?.author} rejected.`);

    if (currentReviewIndex >= pendingReviews.length - 1 && pendingReviews.length > 1) {
      setCurrentReviewIndex(0);
    }
  }

  // Function to navigate to next review
  const nextReview = () => {
    if (currentReviewIndex < pendingReviews.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
    }
  };

  // Function to navigate to previous review
  const previousReview = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1);
    }
  };

  // Ensure index is valid when reviews change
  useEffect(() => {
    if (currentReviewIndex >= pendingReviews.length && pendingReviews.length > 0) {
      setCurrentReviewIndex(pendingReviews.length - 1);
    }
  }, [pendingReviews.length, currentReviewIndex]);

  //commented out as backend endpointis aren't set yet
  /*
  useEffect(() => {
    async function fetchPendingReviews() {
      try {
        const response = await fetch('idk-where-endpoint');
        const data = await response.json();
        setPendingReviews(data);
      } catch (error) {
        console.log("no data found")
      }
    }
    fetchPendingReviews();
  }, []);
  */

  return (
    <section
      id="approvals"
      aria-labelledby="approvals-title"
      className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500"
    >
      <Container>
        <h1
          id="approvals-title"
          className="text-3xl text-pmred-500 font-extrabold sm:text-3xl sm:text-center font-dela-gothic"
        >
          Approvals
        </h1>

        <div className="flex flex-col items-center mt-8 space-y-6">
          {pendingReviews.length === 0 ? (
            <p className="text-lg text-gray-700">No pending reviews.</p>
          ) : (
            <>
              {/* Review counter */}
              <p className="text-lg text-gray-700 font-semibold">
                Review {currentReviewIndex + 1} of {pendingReviews.length}
              </p>

              {/* Current review card */}
              <div
                key={pendingReviews[currentReviewIndex].id}
                className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 border-2 border-pmblue-500"
              >
                <div className="mb-4">
                  <p className="text-xl font-bold mb-2 text-gray-900">Title:</p>
                  <p className="text-lg text-gray-800">{pendingReviews[currentReviewIndex].title}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold mb-2 text-gray-900">Review:</p>
                  <p className="text-lg text-gray-800">{pendingReviews[currentReviewIndex].body}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold mb-2 text-gray-900">Name:</p>
                  <p className="text-lg text-gray-800">{pendingReviews[currentReviewIndex].author}</p>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
                    onClick={() => approveReview(pendingReviews[currentReviewIndex].id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
                    onClick={() => rejectReview(pendingReviews[currentReviewIndex].id)}
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className={`px-4 py-2 bg-pmblue-500 text-white font-bold rounded transition ${currentReviewIndex === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'
                    }`}
                  onClick={previousReview}
                  disabled={currentReviewIndex === 0}
                >
                  Previous
                </button>
                <button
                  className={`px-4 py-2 bg-pmblue-500 text-white font-bold rounded transition ${currentReviewIndex === pendingReviews.length - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'
                    }`}
                  onClick={nextReview}
                  disabled={currentReviewIndex === pendingReviews.length - 1}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  )
}