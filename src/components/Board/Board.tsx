/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BOARD_SIZE } from '../../config/GameConfig';
import { TBoard } from '../../types';
import { Field } from '../Field';

export interface IBoardProps {
	board: TBoard;
	displayGrid?: boolean;
}

export function Board({ board, displayGrid = false }: IBoardProps) {
	return (
		<div
			css={css`
				width: ${BOARD_SIZE.width}px;
				height: ${BOARD_SIZE.height}px;
				display: flex;
				flex-flow: row wrap;
				${displayGrid ? 'border: 1px solid black;' : ''}
			`}
		>
			{board.map((row, rowIndex) =>
				row.map((fieldType, colIndex) => {
					return (
						<Field
							key={`${rowIndex} - ${colIndex}`}
							type={fieldType}
							displayGrid={displayGrid}
							size={{ width: BOARD_SIZE.width / row.length, height: BOARD_SIZE.height / board.length }}
						/>
					);
				})
			)}
		</div>
	);
}
