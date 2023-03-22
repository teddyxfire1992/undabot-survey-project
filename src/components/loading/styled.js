import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 5px;

	span {
		font-family: 'Nunito-Bold', serif;
	}

	.MuiCircularProgress-svg {
		color: ${(props) => props.theme.palette.blue};
	}
`;
