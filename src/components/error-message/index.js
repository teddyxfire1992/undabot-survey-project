import PropTypes from 'prop-types';
import { Message } from './styled';

export const ErrorMessage = ({ children }) => {
	return <Message>{children}</Message>;
};

ErrorMessage.propTypes = {
	children: PropTypes.node.isRequired,
};
