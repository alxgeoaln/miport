import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { GlitchMode } from 'postprocessing'
import {
  EffectComposer,
  Noise,
  Vignette,
  Glitch,
} from '@react-three/postprocessing'

import Header from '@/components/header'

import LoadingContainer from '@/components/loading-container'
import AnimationRenderContainer from '@/components/animation-render-container'
import { AppContext } from '@/context/AppWrapperContext'

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
const Logo = dynamic(() => import('@/components/canvas/Logo'), {
  ssr: false,
  suspense: true,
})

// dom components goes here
const Page = () => {
  const [planeNeedsUpdated, setPlaneState] = useState(false)
  const [vignetteSettings, setVignetteSettings] = useState({
    offset: 0.35,
    darkness: 1,
  })
  const [isGlitchActive, setIsGlitchActive] = useState(false)

  const { loaded } = useContext(AppContext)
  const { push } = useRouter()

  const handleProjectsRouting = () => {
    setPlaneState(true)
    setVignetteSettings({
      offset: 0,
      darkness: 0,
    })
    setIsGlitchActive(true)
  }

  useEffect(() => {
    const info = document.getElementById('info')
    gsap.to(info, {
      y: planeNeedsUpdated ? 500 : -20,
      duration: 1.5,
      onComplete: () => setIsGlitchActive(false),
    })
  }, [planeNeedsUpdated])

  return (
    <>
      {!loaded && <LoadingContainer />}
      {loaded && (
        <>
          <Header
            planeNeedsUpdated={planeNeedsUpdated}
            handleProjectsRouting={handleProjectsRouting}
          />
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
        </>
      )}

      <LCanvas>
        <AnimationRenderContainer
          navigate={push}
          planeNeedsUpdated={planeNeedsUpdated}
        >
          <Background />
          <Logo loaded={loaded} />
          <Avatar />
          <EyeTop />
          <EyeBottom />
          <Ring />
        </AnimationRenderContainer>
        <EffectComposer>
          <Noise opacity={0.2} />
          <Vignette
            eskil={false}
            offset={vignetteSettings.offset}
            darkness={vignetteSettings.darkness}
          />
          <Glitch
            delay={[0.0, 0.1]} // min and max glitch delay
            duration={[0.6, 1.0]} // min and max glitch duration
            strength={[0.3, 0.5]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active={isGlitchActive} // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        </EffectComposer>
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
