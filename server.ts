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
	const completion = await openai.createCompletion({
		model: 'text-davinci-003',
		max_tokens: 1000,
		temperature: 0,
		prompt,
	});
	res.send(completion.data.choices[0].text);
});

const PORT = 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
