// ./api/generate.js
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { OpenAIApi, Configuration } from 'openai';
import path from 'path';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/.env` });
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
	const { prompt } = req.body;
	try {
		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			// model: 'gpt-4',
			max_tokens: 1024,
			temperature: 0,
			prompt,
		});
		res.send(completion.data.choices[0].text);
	} catch (err) {
		//! FIXME  별도 예외 처리 필요
		console.error(err);
		res.send({ errorCode: 0, message: 'gpt api 에러' });
	}
});

const PORT = 4000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
