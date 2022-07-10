import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import gsap from 'gsap'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const Logo = ({ planeNeedsUpdated, pathname }) => {
  const planeMesh = useRef(null)

  const texture = useTexture('/logo.png')
  const textureWhite = useTexture('/logo-white.png')

  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uTexture: { value: texture },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime

    if (pathname === '/projects') {
      uniforms.uTexture.value = textureWhite
    } else {
      uniforms.uTexture.value = texture
    }
  })

  useEffect(() => {
    const tl = gsap.timeline()

    if (planeNeedsUpdated) {
      // logo
      tl.to(
        planeMesh.current.rotation,
        {
          x: -0.01,
          duration: 1.0,
        },
        0.1
      )
      tl.to(
        planeMesh.current.scale,
        {
          x: 0,
          y: 0,
          duration: 1.0,
        },
        0.2
      )
    } else {
      tl.to(
        planeMesh.current.rotation,
        {
          x: -0.01,
          duration: 0.0,
        },
        0.0
      )
      tl.to(
        planeMesh.current.scale,
        {
          x: 0,
          y: 0,
          duration: 0.0,
        },
        0.0
      )

      tl.to(
        planeMesh.current.rotation,
        {
          x: 0,
          duration: 1.0,
        },
        0.1
      )
      tl.to(
        planeMesh.current.scale,
        {
          x: 40,
          y: 40,
          z: 1,
          duration: 1.0,
        },
        0.1
      )
    }
  }, [planeNeedsUpdated])

  return (
    <mesh
      position={[-(viewport.width / 2) + 30, viewport.height / 2 - 25, 0]}
      scale={[40, 40, 1]}
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

export default Logo
