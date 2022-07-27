import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const Background = ({ planeNeedsUpdated, animationOrder }) => {
  const planeMesh = useRef(null)

  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uAnimationSpeed: { value: 0.2 },
      uAlphaChannel: { value: 0.2 },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useEffect(() => {
    if (planeNeedsUpdated) {
      const tl = gsap.timeline()

      tl.to(
        uniforms.uAnimationSpeed,
        {
          value: 10.0,
          duration: 0.3,
        },
        animationOrder
      )
      tl.to(
        uniforms.uAlphaChannel,
        {
          value: 0.0,
        },
        animationOrder
      )
      tl.to(
        planeMesh.current.scale,
        {
          x: 0,
          y: 0,
          delay: 0.2,
        },
        animationOrder + 0.1
      )
    }
  }, [planeNeedsUpdated])

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
        transparent
      />
    </mesh>
  )
}

export default Background
