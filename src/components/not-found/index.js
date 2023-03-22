import { useNavigate } from 'react-router-dom';
import { Link, Text, Wrapper } from './styled';

export const NotFound = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<Wrapper>
			<Text>404</Text>
			<Link onClick={handleClick}>Click here to go back...</Link>
		</Wrapper>
	);
};
