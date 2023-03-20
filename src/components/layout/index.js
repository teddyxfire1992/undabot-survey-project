import { Outlet } from 'react-router-dom';
import { Wrapper } from './styled';

export const Layout = () => {
	return (
		<Wrapper>
			<Outlet />
		</Wrapper>
	);
};
