import { Box, Card, useTheme } from '@mui/material';
import undabotLogo from '../../assets/images/logo-light.png';

export const Header = () => {
	const theme = useTheme();
	return (
		<Box display="flex" flexDirection="column" gap="12px">
			<Card
				sx={{
					backgroundColor: theme.palette.blue,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<img src={undabotLogo} width="200px" alt="undabot logo" />
			</Card>
		</Box>
	);
};
