/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ReactNode } from 'react';
import { ICoordinate } from '../../interfaces';
import { TFieldType } from '../../types';
import { Field } from '../Field';
import { BOARD_SIZE } from './const';

export interface IBoardProps {
	rowCount: number;
	colCount: number;
	fieldEvaluation?: (coordinate: ICoordinate) => TFieldType;
}

export function Board({ rowCount, colCount, fieldEvaluation }: IBoardProps) {
	const fields: ReactNode[] = [];
	for (let row = 0; row < rowCount; row++) {
		for (let col = 0; col < colCount; col++) {
			fields.push(
				<Field
					key={`${row} - ${col}`}
					size={{ width: BOARD_SIZE.width / colCount, height: BOARD_SIZE.height / rowCount }}
					type={fieldEvaluation ? fieldEvaluation({ row, col }) : 'empty'}
				/>
			);
		}
	}
	return (
		<div
			css={css`
				width: ${BOARD_SIZE.width}px;
				height: ${BOARD_SIZE.height}px;
				display: flex;
				flex-flow: row wrap;
				border: 1px solid black;
			`}
		>
			{fields}
		</div>
	);
}
