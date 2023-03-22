import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)`
	height: 50px;
	background-color: ${(props) => props.theme.palette.blue};
	font-family: 'Nunito-Bold', serif;

	&:hover {
		background-color: ${(props) => props.theme.palette.blue};
	}

	&.Mui-disabled {
		background-color: ${(props) => props.theme.palette.blue};
		color: ${(props) => props.theme.palette.light};
		opacity: 0.6;
	}
`;
