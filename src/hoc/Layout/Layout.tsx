import { Grid, Sidebar, Container } from 'semantic-ui-react';
import Topbar from '../../components/UI/Topbar/Topbar';
import styled from 'styled-components';

interface Props {
    children: JSX.Element | JSX.Element[]
}

const LayoutContainer = styled.div`
    height: 100vh;
    padding: 0 !important;
    overflow: hidden;
`

const Main = styled.main`
    height: 93vh;
`;


const Layout = ({ children }: Props) => {
    return (
        <LayoutContainer>
            <Topbar />
            <Main>
                {children}
            </Main>
        </LayoutContainer>
    );
}

export default Layout;