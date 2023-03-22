import PropTypes from 'prop-types';
import { Description, Title } from './styled';
import { Card } from '../card';

export const CardIntro = ({ title, description }) => {
	return (
		<Card isDecorativeLineVisible={true}>
			<Title variant="h1">{title}</Title>
			<Description
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
		</Card>
	);
};

CardIntro.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};
