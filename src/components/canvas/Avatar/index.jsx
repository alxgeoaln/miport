import { useRef, useMemo, useEffect, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useTexture } from '@react-three/drei'

import { AppContext } from '@/context/AppWrapperContext'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const Avatar = ({ planeNeedsUpdated, animationOrder }) => {
  const planeMesh = useRef(null)
  const texture = useTexture('/me.png')

  const { isMobile } = useContext(AppContext)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uTexture: { value: texture },
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
        planeMesh.current.scale,
        {
          x: 100,
          y: 100,
          duration: 0.5,
        },
        animationOrder + 0.1
      )
      tl.to(
        planeMesh.current.position,
        {
          x: 1000,
          y: 300,
          duration: 0.5,
        },
        animationOrder + 0.1
      )
    }
  }, [planeNeedsUpdated])

  return (
    <mesh
      ref={planeMesh}
      scale={[isMobile ? 200 : 300, isMobile ? 300 : 400, 1]}
      position={[0, 20, 0]}
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

export default Avatar
