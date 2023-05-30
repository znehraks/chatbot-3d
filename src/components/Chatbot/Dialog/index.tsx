import React, { useEffect, useState, useRef, useCallback } from 'react';

import { useSpeechRecognition } from 'react-speech-recognition';
import { Skeleton } from 'antd';
import { useRecoilState } from 'recoil';
import { getAnswer } from '../../../api';
import { avatarModeAtom } from '../../../atoms';
import { AVATAR_MODE } from '../../../enum';
import { initialDialog } from '../../../localData';
import { isValidText } from '../../../utils';
import { DialogContainer, Wrapper } from './styledComponents';
import { DialogRows } from './DialogRows';
import { DialogInputComponent } from './DialogInputComponent';

export function Dialog() {
	const dialogRef = useRef<HTMLDivElement>(null);
	const [isAnswering, setIsAnswering] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [, setAvatarMode] = useRecoilState(avatarModeAtom);
	const [dialogStack, setDialogStack] = useState<{ key: number; text: string }[]>([initialDialog]);
	const { finalTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

	const updateDialogStack = useCallback(async () => {
		// 유저가 질문한 텍스트 버블이 set됨
		setDialogStack((prev) => {
			if (prev.length % 2) {
				return [...prev, { key: prev.length, text: finalTranscript }];
			}
			return prev;
		});
		setIsAnswering(true);
		try {
			const data = await getAnswer({ prompt: finalTranscript });
			// 아바타의 답변 텍스트 버블이 set됨
			if (isValidText(data)) {
				setDialogStack((prev) => {
					// 성공
					if (prev.length % 2 === 0) {
						return [...prev, { key: prev.length + 1, text: data }];
					}
					// 위 case 이외
					return prev;
				});
			} else {
				setDialogStack((prev) => {
					// api 데이터 누락
					return [...prev, { key: prev.length + 1, text: '죄송합니다. 잠시 후에, 다시 질문해 주실래요?' }];
				});
				setHasError(true);
			}
		} catch {
			// getAnswer에서 error가 올 경우,
			setDialogStack((prev) => [
				...prev,
				{ key: prev.length + 1, text: '죄송합니다. 잠시 후에, 다시 질문해 주실래요?' },
			]);
			setHasError(true);
		} finally {
			setIsAnswering(false);
		}
	}, [finalTranscript]);

	// 유저의 질문에 대한 처리를 하는 hook
	useEffect(() => {
		if (isValidText(finalTranscript)) {
			updateDialogStack();
		}
	}, [finalTranscript, updateDialogStack]);

	// dialogStack이 update되어, 스크롤이 생길 경우, 자동으로 최하단을 보도록 함
	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
		}
	}, [dialogStack]);

	// 현재 listening, answering 상황에 따라, 아바타가 다른 애니메이션을 보여주도록 state를 set함
	useEffect(() => {
		let timeout: NodeJS.Timeout | undefined;
		if (listening) {
			setAvatarMode(AVATAR_MODE.LISTENING);
		} else if (isAnswering) {
			setAvatarMode(AVATAR_MODE.ANSWERING);
		} else if (hasError) {
			setAvatarMode(AVATAR_MODE.ERROR);
			timeout = setTimeout(() => {
				setHasError(false);
			}, 5000);
		} else {
			setAvatarMode(AVATAR_MODE.WAIT);
		}
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [listening, isAnswering, setAvatarMode, hasError]);

	return (
		<Wrapper>
			<DialogContainer ref={dialogRef}>
				{dialogStack.map(({ key, text }) => (
					<DialogRows key={key} text={text} />
				))}
				{isAnswering && <Skeleton active paragraph={{ rows: 1 }} title={false} />}
				<DialogInputComponent
					finalTranscript={finalTranscript}
					browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
					listening={listening}
				/>
			</DialogContainer>
		</Wrapper>
	);
}
