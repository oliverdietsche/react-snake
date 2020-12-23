/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Typography } from '@material-ui/core';

export interface IStatusBarProps {
	points: number;
	restart: () => void;
}

export function StatusBar({ points, restart }: IStatusBarProps) {
	return (
		<div
			css={css`
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			`}
		>
			<Typography variant="h5">Points: {points}</Typography>
			<Button variant="contained" color="secondary" onClick={restart}>
				Restart
			</Button>
		</div>
	);
}
