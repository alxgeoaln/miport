import { useRef, useMemo, useEffect, useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'

import { AppContext } from '@/context/AppWrapperContext'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const Background = ({ planeNeedsUpdated, referancePoint }) => {
  const planeMesh = useRef(null)

  const { isMobile } = useContext(AppContext)

  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useEffect(() => {}, [planeNeedsUpdated])

  return (
    <mesh
      ref={planeMesh}
      scale={[viewport.width + 1000, viewport.height + 1000, 1]}
      position={[0, 0, -2]}
    >
      <planeBufferGeometry attach='geometry' args={[1, 1, 200, 200]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  )
}

export default Background
