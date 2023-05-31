import axios from 'axios';

export const getAnswer = ({ prompt }: { prompt: string }) => {
	return axios
		.post(import.meta.env.DEV ? 'http://localhost:5000/chat' : 'http://3.36.234.174/chat', {
			prompt,
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			console.log(e);
		});
};
