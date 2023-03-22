import { Box, styled, Typography } from '@mui/material';

export const Title = styled(Typography)`
	font-family: 'Nunito-Bold', serif;
	font-size: 32px;
	margin-bottom: 10px;
`;

export const Description = styled(Box)`
	font-family: 'Nunito-Regular', serif;
	font-size: 15px;

	p {
		margin: 0;
	}
`;
