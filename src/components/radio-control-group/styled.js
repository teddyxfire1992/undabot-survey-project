import { FormControlLabel, RadioGroup, styled } from '@mui/material';

export const ControlLabel = styled(FormControlLabel)`
	.MuiFormControlLabel-label {
		font-family: 'Nunito-Regular', serif;
	}
`;

export const StyledRadioGroup = styled(RadioGroup)`
	.MuiFormControlLabel-root {
		.Mui-checked {
			color: ${(props) => props.theme.palette.blue};
		}
	}

	${(props) => props.theme.breakpoints.down('sm')} {
		flex-direction: column;
	}
`;
