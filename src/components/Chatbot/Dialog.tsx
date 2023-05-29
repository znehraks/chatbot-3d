import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import { getAnswer } from "../../api";
import { Skeleton } from "antd";
import { useRecoilState } from "recoil";
import { avatarModeAtom } from "../../atoms";
import { AVATAR_MODE } from "../../enum";

const Wrapper = styled.div`
  flex: 3;
  background-color: beige;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const DialogContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: bisque;
  padding: 20px;
  overflow-y: scroll;
`;
const DialogRow = styled.div`
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
const DialogSpan = styled.span``;

const DialogInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const DialogInput = styled.input`
  padding: 2px;
`;
const DialogInputButton = styled.button`
  margin: 0 2px;
  font-size: 11px;
`;

export const Dialog = () => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [, setAvatarMode] = useRecoilState(avatarModeAtom);
  const [dialogStack, setDialogStack] = useState<
    { key: number; text: string }[]
  >([
    {
      key: 0,
      text: "무엇이든 물어보세요. 똑똑한 댕댕이가 대답해 드릴게요!",
    },
  ]);
  const {
    transcript,
    finalTranscript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  console.log("transcript", transcript);

  useEffect(() => {
    if (finalTranscript && finalTranscript.trim() !== "") {
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
  }, [listening, isAnswering]);

  console.log("dialogStack", dialogStack);
  return (
    <Wrapper>
      <DialogContainer ref={dialogRef}>
        {dialogStack.map(({ key, text }) => (
          <DialogRow key={key}>
            <DialogSpan>{text}</DialogSpan>
          </DialogRow>
        ))}
        {isAnswering && (
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
        )}
        <DialogInputContainer>
          <DialogInput value={finalTranscript} />
          <DialogInputButton>텍스트로 입력 받기</DialogInputButton>
          {browserSupportsSpeechRecognition && (
            <>
              <DialogInputButton
                onClick={async () => {
                  SpeechRecognition.startListening({
                    language: "ko",
                  });
                }}
                disabled={listening}
              >
                음성 입력 시작
              </DialogInputButton>
              <DialogInputButton
                onClick={() => {
                  SpeechRecognition.stopListening();
                }}
                disabled={!listening}
              >
                음성 입력 중지
              </DialogInputButton>
            </>
          )}
        </DialogInputContainer>
      </DialogContainer>
    </Wrapper>
  );
};
