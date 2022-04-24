import React from 'react';
import styled from 'styled-components';
import AdminNav from './navigation';

const TABLE = styled.table`
    table-layout: fixed;
    width: 80%;
    margin: auto;
    border: 1px solid;
`;

const TD = styled.td`
    border: 1px solid;
    text-align: center;
`;

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

function UserInfo() {
    return (
        <>
        <AdminNav />
        <div>
            
        </div>
        </>
    );
}

export default UserInfo;