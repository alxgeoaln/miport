import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const EyeTop = ({ planeNeedsUpdated }) => {
  const planeMesh = useRef(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
      uIsTop: { value: false },
      uEyeDetail: { value: 0.0 },
      time: { value: 0.0 },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.time.value = clock.elapsedTime
  })

  useEffect(() => {
    if (planeNeedsUpdated) {
      const tl = gsap.timeline()
      tl.to(
        planeMesh.current.scale,
        {
          x: viewport.width,
          y: viewport.height / 2,
          z: 1,
          duration: 1.0,
          ease: 'power3.out',
          delay: 0.5,
        },
        0.1
      )
      tl.to(
        uniforms.uEyeDetail,
        {
          value: 1.0,
          duration: 1.0,
          ease: 'power3.out',
          delay: 0.5,
        },
        0.3
      )
      tl.to(
        uniforms.uOffset.value,
        {
          y: -700 * 0.0005,
          duration: 1.0,
          ease: 'power3.out',
          delay: 1.0,
        },
        0.5
      )
    }
  }, [planeNeedsUpdated])

  return (
    <mesh
      ref={planeMesh}
      scale={[0, 0, 1]}
      position={[0, -viewport.height / 4, 0]}
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

export default EyeTop
