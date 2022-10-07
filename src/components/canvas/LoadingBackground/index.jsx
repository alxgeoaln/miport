import { useRef, useMemo, useEffect } from 'react'

import { useThree } from '@react-three/fiber'
import gsap from 'gsap'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const LoadingBackground = ({ countdownFinished, setLoaded }) => {
  const planeMesh = useRef(null)

  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      dragValue: { value: 0.0 },
    }),
    []
  )

  useEffect(() => {
    if (countdownFinished) {
      const tl = gsap.timeline()

      tl.to(
        uniforms.dragValue,
        {
          value: 5,
          duration: 10,
          ease: 'power3.out',
        },
        0.1
      )
      tl.to(
        planeMesh.current.position,
        {
          y: -viewport.height,
          ease: 'power3.out',
          duration: 2,
          onComplete: () => setLoaded(true),
        },
        0.1
      )
    }
  }, [countdownFinished])

  return (
    <mesh
      position={[0, 0, 1]}
      scale={[viewport.width, viewport.height, 1]}
      ref={planeMesh}
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

export default LoadingBackground
