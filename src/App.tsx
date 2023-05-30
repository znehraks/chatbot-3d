import React from 'react';
import { Chatbot } from './components/Chatbot';
import { RecoilRoot } from 'recoil';

function App() {
	return (
		<RecoilRoot>
			<Chatbot />
		</RecoilRoot>
	);
}

export default App;
