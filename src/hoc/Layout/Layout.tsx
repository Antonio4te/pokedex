import { Grid, Sidebar, Container } from 'semantic-ui-react';
import Topbar from '../../components/UI/Topbar/Topbar';
import styled from 'styled-components';

interface Props {
    children: JSX.Element | JSX.Element[]
}

const LayoutContainer = styled(Grid.Column)`
    height: 100vh;
    padding: 0 !important;
`

const Main = styled.main`
    height: 93vh;
`;

const Pusher = styled(Sidebar.Pusher)`
    overflow: hidden;
`;

const Pushable = styled(Sidebar.Pushable)`
    height: 100vh;
    padding: 0;
    overflow: hidden;
`;

const Layout = ({ children }: Props) => {
    return (
        <Grid style={{ height: '100vh', padding: '0 !important' }}>
            <LayoutContainer>
                <Pushable>
                    <Pusher>
                        <Topbar />
                        <Main>
                            {children}
                        </Main>
                    </Pusher>
                </Pushable>
            </LayoutContainer>
        </Grid>
    );
}

export default Layout;