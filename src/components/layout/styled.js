import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)`
	width: 100vw;
	height: 100vh;
	background-color: ${(props) => props.theme.palette.blueShade};
`;
