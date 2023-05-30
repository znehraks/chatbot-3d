import React, { Dispatch, SetStateAction } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { DialogInput, DialogInputButton, DialogInputContainer } from './styledComponents';

interface IDialogInputComponentProps {
	browserSupportsSpeechRecognition: boolean;
	listening: boolean;
	inputValue: string | undefined;
	setInputValue: Dispatch<SetStateAction<string | undefined>>;
	updateDialogStack: (text: string) => Promise<void>;
}

export function DialogInputComponent({
	browserSupportsSpeechRecognition,
	listening,
	inputValue,
	setInputValue,
	updateDialogStack,
}: IDialogInputComponentProps) {
	const handleOnChange = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
		setInputValue(value);
	};

	return (
		<DialogInputContainer>
			<DialogInput value={inputValue ?? ''} onChange={handleOnChange} />
			<DialogInputButton
				onClick={() => {
					if (inputValue) {
						updateDialogStack(inputValue);
						setInputValue(undefined);
					}
				}}>
				텍스트로 입력 받기
			</DialogInputButton>
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
