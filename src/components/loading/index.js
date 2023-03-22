import { CircularProgress } from '@mui/material';
import { Wrapper } from './styled';

export const Loading = () => {
	return (
		<Wrapper>
			<CircularProgress />
			<span data-testid="loading-message">Please wait...</span>
		</Wrapper>
	);
};
