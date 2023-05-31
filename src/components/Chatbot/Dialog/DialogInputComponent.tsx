import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { DialogInput, DialogInputButton, DialogInputContainer } from './styledComponents';
import { isValidText } from '../../../utils';

interface IDialogInputComponentProps {
	browserSupportsSpeechRecognition: boolean;
	listening: boolean;
	inputValue: string | undefined;
	setInputValue: Dispatch<SetStateAction<string | undefined>>;
	updateDialogStack: (text: string) => Promise<void>;
	isAnswering: boolean;
}

export function DialogInputComponent({
	browserSupportsSpeechRecognition,
	listening,
	inputValue,
	setInputValue,
	updateDialogStack,
	isAnswering,
}: IDialogInputComponentProps) {
	const handleOnChange = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
		setInputValue(value);
	};

	const handleFinishInput = useCallback(
		(value: string | undefined) => {
			if (value) {
				updateDialogStack(value);
				setInputValue(undefined);
			}
		},
		[setInputValue, updateDialogStack]
	);

	// 키보드 이벤트로도, 클릭과 동일한 기능을 수행하도록 이벤트 부착
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && inputValue && isValidText(inputValue)) {
				handleFinishInput(inputValue);
			} else if (e.key === 'Escape') {
				setInputValue(undefined);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleFinishInput, inputValue, setInputValue, updateDialogStack]);

	return (
		<DialogInputContainer>
			<DialogInput value={inputValue ?? ''} onChange={handleOnChange} disabled={isAnswering} />
			<DialogInputButton
				onClick={() => {
					handleFinishInput(inputValue);
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
