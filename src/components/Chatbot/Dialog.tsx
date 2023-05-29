import { useEffect, useState } from "react";
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
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
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
  }
`;
const DialogRow = styled.div``;

export const Dialog = () => {
  const [dialogStack, setDialogStack] = useState<
    { key: number; text: string }[]
  >([]);
  useEffect(() => {
    setDialogStack([
      { key: 0, text: "sdfsdfsd" },
      { key: 1, text: "sdfsaaaadfsd" },
      { key: 2, text: "aacc" },
      { key: 3, text: "xxzzxxzx" },
    ]);
  }, []);
  return (
    <Wrapper>
      <DialogContainer>
        {dialogStack.map(({ key, text }) => (
          <DialogRow key={key}>
            <span>{text}</span>
          </DialogRow>
        ))}
      </DialogContainer>
    </Wrapper>
  );
};
