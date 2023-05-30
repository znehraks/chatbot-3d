import React from 'react';
import { DialogRow, DialogSpan } from './styledComponents';

export function DialogRows({ key, text }: { key: number; text: string }) {
	return (
		<DialogRow key={key}>
			<DialogSpan>{text}</DialogSpan>
		</DialogRow>
	);
}
