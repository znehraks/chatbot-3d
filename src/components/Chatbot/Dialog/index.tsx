import React, { useEffect, useState, useRef } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Skeleton } from 'antd';
import { useRecoilState } from 'recoil';
import { getAnswer } from '../../../api';
import { avatarModeAtom } from '../../../atoms';
import { AVATAR_MODE } from '../../../enum';
import { initialDialog } from '../../../localData';
import { isValidText } from '../../../utils';
import {
	DialogContainer,
	DialogInput,
	DialogInputButton,
	DialogInputContainer,
	DialogRow,
	DialogSpan,
	Wrapper,
} from './styledComponents';

export function Dialog() {
	const dialogRef = useRef<HTMLDivElement>(null);
	const [isAnswering, setIsAnswering] = useState(false);
	const [, setAvatarMode] = useRecoilState(avatarModeAtom);
	const [dialogStack, setDialogStack] = useState<{ key: number; text: string }[]>([initialDialog]);
	const { finalTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

	useEffect(() => {
		if (isValidText(finalTranscript)) {
			setDialogStack((prev) => {
				if (prev.length % 2) {
					return [...prev, { key: prev.length, text: finalTranscript }];
				}
				return prev;
			});
			setIsAnswering(true);
			getAnswer({ prompt: finalTranscript }).then((data) => {
				setDialogStack((prev) => {
					if (prev.length % 2 === 0) {
						return [...prev, { key: prev.length + 1, text: data }];
					}
					return prev;
				});
				setIsAnswering(false);
			});
		}
	}, [finalTranscript]);

	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
		}
	}, [dialogStack]);

	useEffect(() => {
		if (listening) {
			setAvatarMode(AVATAR_MODE.LISTENING);
		} else if (isAnswering) {
			setAvatarMode(AVATAR_MODE.ANSWERING);
		} else {
			setAvatarMode(AVATAR_MODE.WAIT);
		}
	}, [listening, isAnswering, setAvatarMode]);

	console.log('dialogStack', dialogStack);
	return (
		<Wrapper>
			<DialogContainer ref={dialogRef}>
				{dialogStack.map(({ key, text }) => (
					<DialogRow key={key}>
						<DialogSpan>{text}</DialogSpan>
					</DialogRow>
				))}
				{isAnswering && <Skeleton active paragraph={{ rows: 1 }} title={false} />}
				<DialogInputContainer>
					<DialogInput value={finalTranscript} />
					<DialogInputButton>텍스트로 입력 받기</DialogInputButton>
					{browserSupportsSpeechRecognition && (
						<>
							<DialogInputButton
								onClick={async () => {
									SpeechRecognition.startListening({
										language: 'ko',
									});
								}}
								disabled={listening}>
								음성 입력 시작
							</DialogInputButton>
							<DialogInputButton
								onClick={() => {
									SpeechRecognition.stopListening();
								}}
								disabled={!listening}>
								음성 입력 중지
							</DialogInputButton>
						</>
					)}
				</DialogInputContainer>
			</DialogContainer>
		</Wrapper>
	);
}
