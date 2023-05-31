import styled from 'styled-components';
import React from 'react';
import { AvatarCanvas } from './AvatarCanvas';
import { Dialog } from './Dialog';

const Wrapper = styled.div`
	width: 100vw;
	min-height: 100vh;
	background-color: aliceblue;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	width: 800px;
	height: 600px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

export function Chatbot() {
	return (
		<Wrapper>
			<Container>
				<AvatarCanvas />
				<Dialog />
			</Container>
		</Wrapper>
	);
}
