import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useRecoilValue } from "recoil";
import { avatarModeAtom } from "../../../atoms";
import { AVATAR_MODE } from "../../../enum";
export const Avatar = () => {
  const avatarMode = useRecoilValue(avatarModeAtom);
  const modeling = useLoader(GLTFLoader, "/dog.glb");
  modeling.scene.rotation.set(0, 0, 0);
  modeling.scene.position.set(0, -1, 0);
  modeling.scene.scale.set(1.5, 1.5, 1.5);
  const mixer = new THREE.AnimationMixer(modeling.scene);

  const action = mixer.clipAction(
    modeling.animations[
      (() => {
        switch (avatarMode) {
          case AVATAR_MODE.WAIT:
            return 0;
          case AVATAR_MODE.LISTENING:
            return 2;
          case AVATAR_MODE.ANSWERING:
            return 5;
          case AVATAR_MODE.ERROR:
            return 3;
          default:
            return 0;
        }
      })()
    ]
  );
  action.play();

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return <primitive object={modeling.scene} />;
};
