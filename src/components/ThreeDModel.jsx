// ThreeDModel.jsx
// ─────────────────────────────────────────────────────────────────
// Currently uses CSS 3D perspective animation as a fallback.
// To enable full React Three Fiber 3D:
//   1. Add your .glb files to /public/models/
//   2. Create src/components/ThreeDModelCanvas.jsx with the R3F <Canvas>
//   3. Set USE_3D = true below

const USE_3D = false // flip to true once .glb files are ready

// CSS 3D perspective fallback — works on all devices, no WebGL needed
function CssFallback({ image, name, isActive }) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${
        isActive ? 'animate-pouchwiggle' : 'opacity-0'
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="max-h-[65vh] max-w-[85%] object-contain"
          style={{
            filter: 'drop-shadow(0 20px 60px rgba(201,146,42,0.35))',
          }}
        />
      ) : (
        // Placeholder when no image available
        <div
          className="w-48 h-64 bg-gradient-to-br from-gfb-gold/20 to-gfb-gold-light/5
                     border border-gfb-gold/30 rounded-xl flex items-center justify-center"
        >
          <span className="font-cormorant text-gfb-gold text-xl text-center px-4 leading-snug italic">
            {name}
          </span>
        </div>
      )}
    </div>
  )
}

// Main export
export default function ThreeDModel({
  glbPath,
  image,
  name,
  isActive = false,
  isMobile = false,
}) {
  // CSS fallback active until GLB files are ready
  return <CssFallback image={image} name={name} isActive={isActive} />
}

// ─── HOW TO UPGRADE TO FULL 3D ────────────────────────────────────
// Create src/components/ThreeDModelCanvas.jsx:
//
// import { useRef } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Environment, ContactShadows } from '@react-three/drei'
//
// function RotatingModel({ path }) {
//   const ref = useRef()
//   const { scene } = useGLTF(path)
//   useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.4 })
//   return <primitive ref={ref} object={scene} scale={2.5} />
// }
//
// export default function ThreeDModelCanvas({ glbPath }) {
//   return (
//     <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//       <ambientLight intensity={0.3} />
//       <spotLight position={[5, 5, 5]} color="#C9922A" intensity={1.2} />
//       <spotLight position={[-5, 3, 2]} color="#E8E8FF" intensity={0.6} />
//       <Environment preset="city" />
//       <ContactShadows position={[0, -2, 0]} opacity={0.4} blur={2} />
//       <RotatingModel path={glbPath} />
//     </Canvas>
//   )
// }
