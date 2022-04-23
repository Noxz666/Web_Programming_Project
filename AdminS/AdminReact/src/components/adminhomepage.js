import React from 'react';
import styled from 'styled-components';
import AdminNav from './navigation';

const DIV = styled.div`
    text-align: center;
`;

class AdminHome extends React.Component {
    render() {
        return (
            <>
            <AdminNav />
            <p></p>
            <DIV>Just a homepage, nothing to see here</DIV>
            </>
        )
    }
}

export default AdminHome