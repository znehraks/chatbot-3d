import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import * as THREE from "three";

const Wrapper = styled.div`
  flex: 2;
  background-color: aquamarine;
  height: 100%;
`;

export const AvatarCanvas = () => {
  const aspectRatio = (window.innerWidth * 0.6 * 0.4) / window.innerHeight;
  return (
    <Wrapper>
      {" "}
      <Canvas
        gl={{ antialias: true }}
        shadows={{
          enabled: true,
          autoUpdate: true,
          type: THREE.PCFSoftShadowMap,
        }}
        camera={{
          fov: 30,
          aspect: aspectRatio,
          near: 0.1,
          far: 1000,
          position: [0, 3, 0],
          zoom: 0.5,
        }}
      >
        <OrbitControls />
        <mesh>
          <meshBasicMaterial color="#ff0000" />
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </Canvas>
    </Wrapper>
  );
};
