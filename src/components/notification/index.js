import PropTypes from 'prop-types';
import { AlertTitle, Snackbar } from '@mui/material';
import { StyledAlert } from './styled';

export const Notification = ({ isOpen, onClose, title, message }) => {
	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={onClose}
		>
			<StyledAlert onClose={onClose} severity="error">
				<AlertTitle>{title}</AlertTitle>
				{message}
			</StyledAlert>
		</Snackbar>
	);
};

Notification.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};
