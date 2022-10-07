import { useEffect, useContext } from 'react'
import { gsap } from 'gsap'

import { createSpan } from '@/helpers/utils'
import { AppContext } from '@/context/AppWrapperContext'

const LoadingContainer = () => {
  const { setCountdownFinished } = useContext(AppContext)

  useEffect(() => {
    const letterCount = document.getElementById('letter-count')
    const loadingContainer = document.getElementById('loading-container')

    const tl = gsap.timeline()

    for (let i = 0; i <= 100; i++) {
      const span = createSpan(i)
      letterCount.appendChild(span)
    }

    for (let i = 0; i <= 100; i++) {
      const span = document.getElementById(`id-${i}`)
      tl.to(
        span,
        {
          opacity: 0,
          position: 'absolute',
          top: '-40px',
          scale: 1,
        },
        0.1
      )
      tl.to(
        span,
        {
          delay: i * 0.05,
          opacity: 1,
          scale: 2.5,
          position: 'absolute',
          top: '40px',
        },
        0.2
      )
      tl.to(
        span,
        {
          scale: 1,
          delay: i * 0.05,
          opacity: 0,
          position: 'absolute',
          top: '40px',
        },
        0.3
      )

      if (i === 100) {
        tl.to(
          letterCount,
          {
            opacity: 0,
            marginTop: -100,
            delay: i * 0.05,
          },
          0.3
        )
        tl.to(
          letterCount,
          {
            onUpdate: () => (letterCount.innerText = 2),
            marginTop: 0,
            opacity: 1,
            delay: i * 0.05,
            onComplete: () => setCountdownFinished(true),
          },
          0.4
        )

        tl.to(
          loadingContainer,
          {
            y: window.innerHeight,
            delay: i * 0.053,
          },
          0.4
        )
      }
    }
  }, [])

  return (
    <div
      className='fixed z-40 flex h-full w-full justify-center items-center bg-transparent'
      id='loading-container'
    >
      <div id='letter-container'>
        <h1 className='text-[11rem] text-white' id='letter'>
          A
        </h1>
      </div>
      <div
        className='flex text-white text-[3rem] bold absolute transform translate-x-full -translate-y-full'
        id='letter-counter'
      >
        <h2 className='ml-1.5 font-bold' id='letter-count'>
          <span id='first-count'>1.</span>
        </h2>
      </div>
    </div>
  )
}

export default LoadingContainer
