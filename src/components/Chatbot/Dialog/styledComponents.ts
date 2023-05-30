import styled from 'styled-components';

export const Wrapper = styled.div`
	flex: 3;
	background-color: beige;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;
export const DialogContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: bisque;
	padding: 20px;
	overflow-y: scroll;
`;
export const DialogRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px 0;
	width: 100%;
	max-height: fit-content;
	span {
		max-width: 90%;
		padding: 5px 10px;
		border-radius: 10px;
		min-height: 20px;
		max-height: fit-content;
	}
	&:nth-child(odd) {
		justify-content: flex-start;
		span {
			background-color: #ababab;
		}
	}
	&:nth-child(even) {
		justify-content: flex-end;
		span {
			background-color: skyblue;
		}
	}
`;
export const DialogSpan = styled.span``;

export const DialogInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;
export const DialogInput = styled.input`
	padding: 2px;
`;
export const DialogInputButton = styled.button`
	margin: 0 2px;
	font-size: 11px;
`;
