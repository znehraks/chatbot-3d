import axios from 'axios';

export const getAnswer = ({ prompt }: { prompt: string }) => {
	return axios
		.post(import.meta.env.DEV ? 'http://localhost:4000/chat' : 'http://3.36.234.174/chat', {
			prompt,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			//! FIXME  별도 예외 처리 필요
			console.log(e);
		});
};
