import React from 'react';
import { DialogRow, DialogSpan } from './styledComponents';

interface IDialogRowsProps {
	text: string;
}

export function DialogRows({ text }: IDialogRowsProps) {
	return (
		<DialogRow>
			<DialogSpan>{text}</DialogSpan>
		</DialogRow>
	);
}
