import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


function SearchFrom () {
    const FetchData = async () => {
        const data = await fetch('/search/FindAll');
        items = await data.json();
        setItems(items);
    }
    const items = 
    [   
        {
            "Product_ID" : 1,
            "Product_Name" : "Succubus", 
            "Rating" : 4.1,
            "Age_restriction" : 18,
            "company_name" : "MadHouse_studio",
            "Product_price" : 250,
            "Product_type" : "Blood",
            "Product_platform":"Console"
        },
        {   
            "Product_ID" : 2,
            "Product_Name" : "Total War WarhammerII", 
            "Rating" : 4.7,
            "Age_restriction" : 18,
            "company_name" : "SEGA",
            "Product_price" : 1200,
            "Product_type" : "Fighting",
            "Product_platform":"Console"
        },  
        {
            "Product_ID" : 3,
            "Product_Name" : "Heros Hours", 
            "Rating" : 3.9,
            "Age_restriction" : 12,
            "company_name" : "Indie_Software",
            "Product_price" : 90,
            "Product_type" : "Fighting",
            "Product_platform":"Moblie"
        },
        {   
            "Product_ID" : 4,
            "Product_Name" : "Sid Meier s Civilization VI", 
            "Rating" : 4.6,
            "Age_restriction" : 12,
            "company_name" : "2K_studio",
            "Product_price" : 300,
            "Product_type" : "Turn-base",
            "Product_platform":"Console"
        },
        {   
            "Product_ID" : 5,
            "Product_Name" : "Pixel Game Maker MV", 
            "Rating" : 4.2,
            "Age_restriction" : 9,
            "company_name" : "KADOKAWA",
            "Product_price" : 1200,
            "Product_type" : "RPG",
            "Product_platform":"Console"
        },
        {   
            "Product_ID" : 6,
            "Product_Name" : "Boba App", 
            "Rating" : 3.1,
            "Age_restriction" : 5,
            "company_name" : "KADOKAWA",
            "Product_price" : 150,
            "Product_type" : "RPG",
            "Product_platform":"Console"
        }      
    ]
    
    //console.log(items)
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
                {items.map(obj => {
                return (
                    <tr>                   
                        <td>{obj.Product_ID}</td>
                        <td>{obj.Product_Name}</td>  
                        <td>{obj.Rating}</td>  
                        <td>{obj.Age_restriction}</td>  
                        <td>{obj.company_name}</td>  
                        <td>{obj.Product_price}</td>  
                        <td>{obj.Product_type}</td>  
                        <td>{obj.Product_platform}</td>                                       
                    </tr>

                );
                })}                   
                    {/* <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr> */}
            </tbody>
        </Table>

    </div>    
    );
}

export default SearchFrom;