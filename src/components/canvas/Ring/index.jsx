import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'

import vertex from './shaders/vertex.vert'
import fragment from './shaders/fragment.frag'

const Ring = ({ planeNeedsUpdated, navigate }) => {
  const planeMesh = useRef(null)
  const { viewport, camera } = useThree()

  const uniforms = useMemo(
    () => ({
      uColor1: { value: new THREE.Color('#FEA904') },
      uColor2: { value: new THREE.Color('#A01212') },
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
      tl.to(planeMesh.current.scale, {
        x: viewport.height / 2,
        y: viewport.height / 2,
        z: 1,
        duration: 1.3,
        ease: 'power3.out',
        delay: 1.0,
      })
      tl.to(camera.position, {
        z: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 1.0,
        onComplete: () => navigate('/projects'),
      })
    }
  }, [planeNeedsUpdated])

  return (
    <mesh ref={planeMesh} scale={[0, 0, 1]} position={[0, 0, -0.01]}>
      <planeBufferGeometry attach='geometry' args={[1, 1, 200, 200]} />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  )
}

export default Ring
