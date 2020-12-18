/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ISize } from '../../interfaces';
import { TFieldType } from '../../types';

export interface IFieldProps {
	type: TFieldType;
	size: ISize;
}

export function Field({ type, size }: IFieldProps) {
	const backgroundColor = (() => {
		switch (type) {
			case 'empty':
				return 'lightgrey';
			case 'snake':
				return 'green';
			case 'food':
				return 'cyan';
			default:
				return 'transparent';
		}
	})();

	return (
		<div
			css={css`
				width: ${size.width}px;
				height: ${size.height}px;
				background-color: ${backgroundColor};
				border: 1px solid black;
				box-sizing: border-box;
			`}
		/>
	);
}
