import { RadioControlGroup } from '../radio-control-group';
import { Card } from '../card';

export const CardRating = (props) => {
	return (
		<Card>
			<RadioControlGroup {...props} />
		</Card>
	);
};
