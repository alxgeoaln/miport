import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import Header from '@/components/header'

import LoadingContainer from '@/components/loading-container'
import { AppContext } from '@/context/AppWrapperContext'
import gsap from 'gsap'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Background = dynamic(() => import('@/components/canvas/Background'), {
  ssr: false,
  suspense: true,
})
const Avatar = dynamic(() => import('@/components/canvas/Avatar'), {
  ssr: false,
  suspense: true,
})

const EyeTop = dynamic(() => import('@/components/canvas/Eye/EyeTop'), {
  ssr: false,
  suspense: true,
})
const EyeBottom = dynamic(() => import('@/components/canvas/Eye/EyeBottom'), {
  ssr: false,
  suspense: true,
})
const Ring = dynamic(() => import('@/components/canvas/Ring'), {
  ssr: false,
  suspense: true,
})

// dom components goes here
const Page = () => {
  const [planeNeedsUpdated, setPlaneState] = useState(false)

  const { loaded } = useContext(AppContext)
  const { push } = useRouter()

  const handleProjectsRouting = () => {
    setPlaneState(true)
  }

  useEffect(() => {
    if (planeNeedsUpdated) {
      const info = document.getElementById('info')

      gsap.to(info, {
        y: 500,
        duration: 1.5,
      })
    }
  }, [planeNeedsUpdated])

  return (
    <>
      {<Header handleProjectsRouting={handleProjectsRouting} />}
      {/* {!loaded && <LoadingContainer />} */}
      <div
        id='info'
        className='
        absolute 
        z-40
        top-[calc(50%+210px)] 
        left-2/4 
        -translate-x-2/4 
        text-center'
      >
        <p className='font-bold text-xl'>Alin Alexandru</p>
        <p className='italic text-gray-400'>frontend developer</p>
      </div>

      <LCanvas>
        <>
          <Background />
          <Avatar planeNeedsUpdated={planeNeedsUpdated} />
          <EyeTop planeNeedsUpdated={planeNeedsUpdated} />
          <EyeBottom planeNeedsUpdated={planeNeedsUpdated} />
          <Ring navigate={push} planeNeedsUpdated={planeNeedsUpdated} />
        </>
      </LCanvas>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'About',
    },
  }
}
