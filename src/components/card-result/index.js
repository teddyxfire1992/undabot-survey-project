import PropTypes from 'prop-types';
import { Answer } from './styled';
import { Card } from '../card';
import { FormLabel } from '../form-label';

export const CardResult = ({ question, answer }) => {
	return (
		<Card>
			<FormLabel>{question}</FormLabel>
			<Answer>{answer}</Answer>
		</Card>
	);
};

CardResult.propTypes = {
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
};
