import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState, useMemo } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";

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
`;
const DialogRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
  width: 100%;
  span {
    padding: 5px 10px;
    border-radius: 10px;
  }
  &:nth-child(odd) {
    span {
      background-color: skyblue;
    }
    height: 20px;
    justify-content: flex-end;
  }
  &:nth-child(even) {
    span {
      background-color: #ababab;
    }
    height: 20px;
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
  const [dialogStack, setDialogStack] = useState<
    { key: number; text: string }[]
  >([]);
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  console.log("transcript", transcript);

  const useChatGPT = () => {
    axios
      .post("http://localhost:5000/chat", {
        prompt: "what is pizza?",
      })
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    if (finalTranscript && finalTranscript.trim() !== "") {
      setDialogStack((prev) => [
        ...prev,
        { key: prev.length, text: finalTranscript },
      ]);
    }
  }, [finalTranscript]);

  console.log("dialogStack", dialogStack);
  return (
    <Wrapper>
      <DialogContainer>
        {dialogStack.map(({ key, text }) => (
          <DialogRow key={key}>
            <DialogSpan>{text}</DialogSpan>
          </DialogRow>
        ))}
        <DialogInputContainer>
          <DialogInput value={finalTranscript} />
          {/* <DialogInputButton onClick={useChatGPT}>테스트</DialogInputButton> */}
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
                onClick={SpeechRecognition.stopListening}
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
