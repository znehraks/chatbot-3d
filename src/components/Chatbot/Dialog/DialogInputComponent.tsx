import React from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { DialogInput, DialogInputButton, DialogInputContainer } from './styledComponents';

interface IDialogInputComponentProps {
	finalTranscript: string;
	browserSupportsSpeechRecognition: boolean;
	listening: boolean;
}

export function DialogInputComponent({
	finalTranscript,
	browserSupportsSpeechRecognition,
	listening,
}: IDialogInputComponentProps) {
	return (
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
	);
}
