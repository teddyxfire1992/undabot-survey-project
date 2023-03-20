import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
	return (
		<Box
			width="100%"
			display="flex"
			flexDirection="column"
			alignItems="center"
			gap="5px"
		>
			<CircularProgress />
			<span>Please wait...</span>
		</Box>
	);
};
