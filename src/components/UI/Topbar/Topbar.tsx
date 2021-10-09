import { Menu, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import logo from '../../../assets/img/logo.png';

const Nav = styled(Menu)`
    height: 7vh;
    margin: 0 !important;
`

const Topbar = () => {
    return (
        <Nav stackable>
            <Menu.Item>
                <Image src={logo} size="tiny" alt="" />
            </Menu.Item>
        </Nav>
    );
}

export default Topbar;