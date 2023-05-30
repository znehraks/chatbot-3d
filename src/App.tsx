import React from 'react';
import { RecoilRoot } from 'recoil';
import { Chatbot } from './components/Chatbot';

function App() {
	return (
		<RecoilRoot>
			<Chatbot />
		</RecoilRoot>
	);
}

export default App;
