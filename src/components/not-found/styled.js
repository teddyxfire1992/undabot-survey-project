import { Box, styled, Typography } from '@mui/material';

export const Wrapper = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 15px;
`;

export const Text = styled(Typography)`
	font-family: 'Nunito-Bold', serif;
	font-size: 60px;
	line-height: normal;
`;

export const Link = styled(Typography)`
	color: ${(props) => props.theme.palette.dark};
	cursor: pointer;

	&:hover {
		color: ${(props) => props.theme.palette.blue};
	}
`;
