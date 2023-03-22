import { FormLabel, styled } from '@mui/material';

export const StyledFormLabel = styled(FormLabel)`
	font-family: 'Nunito-Regular', serif;
	font-size: 16px;

	&.Mui-focused {
		color: ${(props) => props.theme.palette.blue};
	}
`;
