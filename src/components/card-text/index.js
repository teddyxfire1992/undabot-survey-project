import { Input } from '../input';
import { Card } from '../card';

export const CardText = (props) => {
	return (
		<Card>
			<Input {...props} />
		</Card>
	);
};
