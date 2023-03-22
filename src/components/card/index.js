import PropTypes from 'prop-types';
import { StyledCard, DecorativeLine } from './styled';

export const Card = ({ children, isDecorativeLineVisible }) => {
	return (
		<StyledCard>
			{isDecorativeLineVisible && <DecorativeLine />}
			{children}
		</StyledCard>
	);
};

Card.defaultProps = {
	isDecorativeLineVisible: false,
};

Card.propTypes = {
	children: PropTypes.node.isRequired,
	isDecorativeLineVisible: PropTypes.bool,
};
