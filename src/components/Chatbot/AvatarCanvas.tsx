import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import * as THREE from 'three';
import React from 'react';
import { Avatar } from './models/Avatar';
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, CAMERA_ZOOM } from '../../constants';

const Wrapper = styled.div`
	flex: 2;
	height: 100%;
`;

export function AvatarCanvas() {
	const aspectRatio = window.innerWidth / window.innerHeight;
	return (
		<Wrapper>
			<Canvas
				onCreated={({ camera }) => {
					camera.lookAt(new THREE.Vector3(0, 0, 0));
				}}
				gl={{ antialias: true }}
				shadows={{
					enabled: true,
					autoUpdate: true,
					type: THREE.PCFSoftShadowMap,
				}}
				camera={{
					fov: CAMERA_FOV,
					aspect: aspectRatio,
					near: CAMERA_NEAR,
					far: CAMERA_FAR,
					zoom: CAMERA_ZOOM,
				}}>
				<ambientLight />
				<Avatar />
			</Canvas>
		</Wrapper>
	);
}
