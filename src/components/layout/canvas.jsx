import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import useStore from '@/helpers/store'
import { calculateFOV } from '@/helpers/utils'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{
        fov: calculateFOV(window.innerHeight, 5),
        aspect: window.innerHeight / window.innerWidth,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
