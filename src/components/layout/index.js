import { Outlet } from 'react-router-dom';
import { Container, ContentWrapper } from './styled';
import { Header } from '../header';

export const Layout = () => {
	return (
		<Container>
			<ContentWrapper>
				<Header />
				<Outlet />
			</ContentWrapper>
		</Container>
	);
};
