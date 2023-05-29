import axios from "axios";

export const getAnswer = ({ prompt }: { prompt: string }) => {
  return axios
    .post("http://localhost:5000/chat", {
      prompt,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });
};
