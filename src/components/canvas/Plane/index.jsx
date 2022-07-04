import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { gsap } from 'gsap'

import vertex from './shanders/vertex.vert'
import fragment from './shanders/fragment.frag'

const dpi = 200

const Plane = ({ planeNeedsUpdated }) => {
  const planeMesh = useRef(null)

  const { viewport } = useThree()
  const texture = useTexture('/Desktop.png')

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0.0 },
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
          duration: 1.5,
        },
        0.1
      )
      tl.to(
        planeMesh.current.position,
        {
          x: viewport.width + 500,
          y: 200,
          duration: 3.0,
        },
        0.1
      )
    }
  }, [planeNeedsUpdated])

  return (
    <mesh
      ref={planeMesh}
      scale={[viewport.width, viewport.height, 1]}
      position={[0, 0, 0]}
    >
      <planeBufferGeometry attach='geometry' args={[1, 1, dpi, dpi * 1.5]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  )
}

export default Plane
