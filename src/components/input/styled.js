import { FormControl, Input, styled } from '@mui/material';

export const FormControlWrapper = styled(FormControl)`
	width: 100%;
`;

export const StyledInput = styled(Input)`
	font-family: 'Nunito-Regular', serif;

	&:after {
		border-bottom: 2px solid ${(props) => props.theme.palette.blue};
	}
`;
