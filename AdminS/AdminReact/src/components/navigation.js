import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Menu = styled.nav`
    display: flex;
    flex-direction: row;
    margin: 0px;
    background-color: grey;
`;

const MyUl = styled.ul`
    list-style-type: none;
    display: flex;
`;

const MyLi = styled.li`
    display: block;
    padding: 2px 14px;
`;

const MyLink = styled(Link)`
    font-size: 12pt;
    color: white;
    text-decoration: none;
`;

const LinkLogout = styled(Link)`
    color: red;
    text-decoration: none;
`;

class AdminNav extends React.Component {
    render() {
        return (
            <Menu>
                <MyUl>
                    <MyLi>
                        <MyLink to = '/Adminhomepage'>Homepage</MyLink>
                    </MyLi>
                    <MyLi>
                        <MyLink to = '/AdminManagement'>Manage User</MyLink>
                    </MyLi>
                    <MyLi>
                        <LinkLogout to = '/'>Log out</LinkLogout>
                    </MyLi>
                </MyUl>
            </Menu>
        );
    }
}

export default AdminNav;