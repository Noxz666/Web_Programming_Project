import React from 'react';


import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';



const SearchFrom = () => {
    return (
    <div className="Search_page">   

        <br></br><br></br><br></br>
        <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
        </Form>

        <br></br><br></br><br></br>

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>    
                <th>Product_ID</th>
                <th>Product_Name</th>
                <th>Rating</th>
                <th>Age_restriction</th>
                <th>company_name</th>
                <th>Product_price</th>
                <th>Product_type</th>
                <th>Product_platform </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
           
            </tbody>
        </Table>

    </div>    
    );
}

export default SearchFrom;