import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Physics,
  RigidBody,
  RapierRigidBody,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/python.png",
  "/images/cpp.png",
  "/images/java.png",
  "/images/mysql.png",
  "/images/numpy.png",
  "/images/pandas.png",
  "/images/matplotlib.png",
  "/images/gradio.png",
  "/images/ml.png",
  "/images/powerbi.png",
  "/images/tableau.png",
  "/images/snowflake.png",
  "/images/framer.png",
  "/images/figma.png",
  "/images/claude.png",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

textures.forEach((t) => {
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
});

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cubes = [...Array(30)].map(() => ({
  scale: [0.85, 1, 1.15][Math.floor(Math.random() * 3)],
}));

type CubeProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.Material | THREE.Material[];
  isActive: boolean;
};

function CubeGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: CubeProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.5 * scale, 0.5 * scale, 0.5 * scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={cubeGeometry}
        material={material}
        rotation={[0.35, 0.75, 0.25]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    
    // Refresh ScrollTrigger because Suspense lazy loading affects DOM heights
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map((texture) => {
      const m = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color("#ffffff"),
        emissiveMap: texture,
        emissiveIntensity: 0.35,
        metalness: 0.15,
        roughness: 0.85,
      });
      // Same logo on all faces for readability.
      return [m, m, m, m, m, m];
    });
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {cubes.map((props, i) => (
            <CubeGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
