import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { gsap } from 'gsap'
import { Vector2 } from 'three'

import vertex from './shanders/vertex.vert'
import fragment from './shanders/fragment.frag'

const dpi = 200

const Plane = ({
  planeNeedsUpdated,
  textureName,
  positionX = 0,
  positionY = 0,
}) => {
  const planeMesh = useRef(null)

  const { viewport } = useThree()
  const texture = useTexture(`./${textureName}`)

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0.0 },
      uPlaneUv: {
        value: new Vector2(0.0),
      },
      uStepValue: { value: 0.0 },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useEffect(() => {
    if (planeNeedsUpdated) {
    }
  }, [planeNeedsUpdated])

  const handleOnPointerMove = (e) => {
    gsap.to(uniforms.uStepValue, {
      value: 0.005,
    })

    uniforms.uPlaneUv.value.x = e.uv.x
    uniforms.uPlaneUv.value.y = e.uv.y
  }

  const handleOnPointerOut = () => {
    gsap.to(uniforms.uStepValue, {
      value: 0.0,
    })
    gsap.to(uniforms.uPlaneUv.value, {
      x: 0,
      y: 0,
    })
  }

  return (
    <mesh
      ref={planeMesh}
      scale={[300, 400, 1]}
      position={[positionX, positionY, 0]}
      onPointerMove={handleOnPointerMove}
      onPointerLeave={handleOnPointerOut}
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
