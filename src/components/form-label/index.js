import PropTypes from 'prop-types';
import { StyledFormLabel } from './styled';

export const FormLabel = ({ children }) => {
	return <StyledFormLabel>{children}</StyledFormLabel>;
};

FormLabel.propTypes = {
	children: PropTypes.node.isRequired,
};
