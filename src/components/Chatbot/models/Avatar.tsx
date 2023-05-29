import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export const Avatar = () => {
  const modeling = useLoader(GLTFLoader, "/dog.glb");
  modeling.scene.rotation.set(0, 0, 0);
  modeling.scene.position.set(0, -1, 0);
  modeling.scene.scale.set(1.5, 1.5, 1.5);
  console.log("modeling", modeling);
  const mixer = new THREE.AnimationMixer(modeling.scene);

  const action = mixer.clipAction(modeling.animations[0]);
  action.play();

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return <primitive object={modeling.scene} />;
};
