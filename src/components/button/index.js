import PropTypes from 'prop-types';
import { StyledButton } from './styled';

export const Button = ({ onClick, children, isLoading }) => {
	return (
		<StyledButton variant="contained" onClick={onClick} disabled={isLoading}>
			{children}
		</StyledButton>
	);
};

Button.defaultProps = {
	isLoading: false,
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	isLoading: PropTypes.bool,
};
