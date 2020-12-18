/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Typography } from '@material-ui/core';

export interface IStatusBarProps {
	points: number;
}

export function StatusBar({ points }: IStatusBarProps) {
	return (
		<div
			css={css`
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			`}
		>
			<Typography
				css={css`
					font-size: 24px !important;
				`}
			>
				Points: {points}
			</Typography>
		</div>
	);
}
