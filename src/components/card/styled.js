import { styled, Card, Box } from '@mui/material';

export const StyledCard = styled(Card)`
	padding: 20px;
	position: relative;
`;

export const DecorativeLine = styled(Box)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 10px;
	background-color: ${(props) => props.theme.palette.blue};
`;
