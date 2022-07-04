import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import Header from '@/components/header'

import LoadingContainer from '@/components/loading-container'
import { AppContext } from '@/context/AppWrapperContext'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})
const Plane = dynamic(() => import('@/components/canvas/Plane'), {
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

  return (
    <>
      {loaded && <Header handleProjectsRouting={handleProjectsRouting} />}
      {!loaded && <LoadingContainer />}
      <LCanvas>
        <>
          <Plane planeNeedsUpdated={planeNeedsUpdated} />
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
