import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useState } from "react";
import { useModal } from 'react-hooks-use-modal';
import Card from 'react-bootstrap/Card'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Link} from "react-router-dom";

import {LinkContainer} from 'react-router-bootstrap';


//Potato Search
function CheckingSearch(data,Tag,KeySearch)
{   
    var CurrentResult = [];            
    for(let nA = 0; nA < data.length; nA++)
    {           
        if(Tag == "All")  
        {            
            CurrentResult.push(data[nA]);
        }      												
        if(Tag == "p_id" && KeySearch == data[nA].p_id )     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag == "p_name" && KeySearch == data[nA].p_name )     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag == "rating" && KeySearch == data[nA].rating )     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag == "age_restriction" && KeySearch == data[nA].age_restriction )     
        {
            CurrentResult.push(data[nA]);
        }          		
        if(Tag == "company_name" && KeySearch == data[nA].company_name)     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag == "p_price" && KeySearch == data[nA].p_price)     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag == "p_type" && KeySearch == data[nA].p_type)     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag == "p_platform" && KeySearch == data[nA].p_platform)     
        {
            CurrentResult.push(data[nA]);
        }         
    }
    // console.log(data);
    // console.log(data.length);
    // console.log(CurrentResult);
    return CurrentResult;        
   
}



function SearchFrom () {  
    
    
    //Handel keyword
    const [KeySearch, setKeySearch] = useState("");
    const [Tag, setTag] = useState("");    
    const [Data,setData] = useState([]); 
    
    //CRUD From handel event
    const [CRUD_type, setCRUD_type] = useState("");
    const [Product_ID, setProduct_ID] = useState("");
    const [Product_Name, setProduct_Name] = useState("");    
    const [Rating, setRating] = useState("");    
    const [Age_restriction, setAge_restriction] = useState("");    
    const [company_name, setcompany_name] = useState("");    
    const [Product_price, setProduct_price] = useState(""); 
    const [Product_type, setProduct_type] = useState("");    
    const [Product_platform, setProduct_platform] = useState("");  

    const [SelctedID_Data,setSelctedID_Data] = useState([{}]);
    
    //Handel with card pop-up (React-hook)
    const [Modal_Insert, open_Insert, close_Insert] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    const [Modal_Update, open_Update, close_Update] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    const [Modal_Delete, open_Delete, close_Delete] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });

    const [Modal_Info, open_Info, close_Info] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
    });


    //Handel Serach  
    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log(DataJSON);
        // console.log("KeySearch: "+KeySearch);
        // console.log("Tag: "+ Tag); 
        fetch("http://localhost:3001/AllData",
        {
            method: 'GET',
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
    
        })       
        .then((res) => res.json())
        .then((AllData) => 
        {             
            //console.log(AllData);                                  
            setData(CheckingSearch(AllData,Tag,KeySearch));                  
            //console.log(Data);
        })  
                                                                            
    } 

    //Handel CommandList CRUD
    const CRUD_Submit = (event) => {
        event.preventDefault(); 
        console.log("CRUD_type: " + CRUD_type);       
        console.log(Product_ID);
        console.log(Product_Name);        

        switch(CRUD_type) {
            case '1':
                fetch('http://localhost:3001/Insert', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Insert_Data: {
                            p_id: Product_ID,
                            p_name: Product_Name,
                            rating: Rating,
                            age_restriction: Age_restriction,
                            company_name: company_name,
                            p_price: Product_price,
                            p_type: Product_type,
                            p_platform: Product_platform
                        }
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        this.setState({
                            searchs: response,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });                
                break;
            case '2':
                fetch('http://localhost:3001/Update', 
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Update_Data: {
                            p_id: Product_ID,
                            p_name: Product_Name,
                            rating: Rating,
                            age_restriction: Age_restriction,
                            company_name: company_name,
                            p_price: Product_price,
                            p_type: Product_type,
                            p_platform: Product_platform
                        }
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        this.setState({
                            searchs: response,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });  
                break;    
            case '3':   
                fetch('http://localhost:3001/Delete', 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Delete_Data: {
                            p_id: Product_ID                           
                        }
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        this.setState({
                            searchs: response,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });  
                break;    
            case '4':
                fetch('http://localhost:3001/AllData/:id', 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Select_ID_Data: {
                            p_id: Product_ID                           
                        }
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        setSelctedID_Data(response);
                        console.log(SelctedID_Data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });                 
                break;    
        }
    }                 

    return (
    <div className="Search_page">   

        <br></br><br></br><br></br>
        <Form className="d-flex" onSubmit={handleSubmit}>
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={KeySearch}
                    onChange={(e) => setKeySearch(e.target.value)}

                />  
                <select onChange={(e) => setTag(e.target.value)}>
                    <option value="Null">Select your Tag you want to find</option>  
                    <option value="All">All Data</option>              
                    <option value="p_id">Product_ID</option>                                
                    <option value="p_name">Product_Name</option>                                      
                    <option value="rating">Rating</option>  
                    <option value="age_restriction">Age_restriction</option>  
                    <option value="company_name">company_name</option>  
                    <option value="p_price">Product_price</option>  
                    <option value="p_type">Product_type</option>  
                    <option value="p_platform">Product_platform</option>  

                </select>                               
                
                <Button variant="outline-success" type="submit">Search</Button>
        </Form>
        <br></br><br></br><br></br>
        <Table striped bordered hover>
            <thead>
            <tr>               
                <th>Product_ID</th>
                <th>Product_Name</th>
                <th>Rating</th>
                <th>Age_restriction</th>
                <th>Company_name</th>
                <th>Product_price</th>
                <th>Product_type</th>
                <th>Product_platform </th>
                <th> Commandlist </th>
            </tr>
            </thead>
            <tbody>
                {Data.map(obj => {
                return (
                    <tr>                   
                        <td>{obj.p_id}</td>
                        <td>{obj.p_name}</td>  
                        <td>{obj.rating}</td>  
                        <td>{obj.age_restriction}</td>  
                        <td>{obj.company_name}</td>  
                        <td>{obj.p_price}</td>  
                        <td>{obj.p_type}</td>  
                        <td>{obj.p_platform}</td>  
                        <td>
                        {/* {isOpen ? 'Yes' : 'No'} */}         
                            <ButtonGroup>
                            
                            <Link to={{pathname: `/AllData/${obj.p_id}`, query: { id: obj}}}>
                                <Button variant="info">Info</Button> 
                            </Link>                           
                                <Button variant="warning"  onClick={open_Update}>Update</Button>
                                <Button variant="danger"  onClick={open_Delete}>Delete</Button>
                            </ButtonGroup>
                        </td>                                    
                    </tr>
                );
                })}                                     
            </tbody>
        </Table> 
        <div className="d-grid gap-2">       
            <Button variant="success" size="lg" onClick={open_Insert}>Insert</Button>
        </div> 
        <Modal_Insert>
            <Card style={{ width:'240 rem'}} border="success">
                <Card.Body>
                    <Card.Title>Insert</Card.Title>                    
                        <Card.Text>
                            Please write data you want to insert.                            
                        </Card.Text>                       

                        <Form onSubmit={CRUD_Submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control placeholder="ID" value={Product_ID} onChange={(e) => setProduct_ID(e.target.value)}/>                              
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control placeholder="Product Name" value={Product_Name} onChange={(e) => setProduct_Name(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control placeholder="Rating" value={Rating} onChange={(e) => setRating(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Age restriction</Form.Label>
                                <Form.Control placeholder="Age restriction" value={Age_restriction} onChange={(e) => setAge_restriction(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Company name</Form.Label>
                                <Form.Control placeholder="Company name" value={company_name} onChange={(e) => setcompany_name(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product price</Form.Label>
                                <Form.Control placeholder="Product price" value={Product_price} onChange={(e) => setProduct_price(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product type</Form.Label>
                                <Form.Control placeholder="Product type" value={Product_type} onChange={(e) => setProduct_type(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product platform</Form.Label>
                                <Form.Control placeholder="Product platform" value={Product_platform} onChange={(e) => setProduct_platform(e.target.value)}/>
                            </Form.Group>
                           
                            <Button variant="primary" type="submit" value="1" onClick={(e) => setCRUD_type(e.target.value)}>Submit</Button>
                        </Form>
                        <br></br>
                    <Button onClick={close_Insert}>CLOSE</Button>
                </Card.Body>
            </Card>            
        </Modal_Insert> 

        <Modal_Update>
            <Card style={{ width: '18rem' }} border="warning">
            <Card.Body>
                    <Card.Title>Update</Card.Title>                    
                        <Card.Text>
                            Please write data you want to Update.                            
                        </Card.Text>                       

                        <Form onSubmit={CRUD_Submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control placeholder="ID" value={Product_ID} onChange={(e) => setProduct_ID(e.target.value)}/>                              
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control placeholder="Product Name" value={Product_Name} onChange={(e) => setProduct_Name(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control placeholder="Rating" value={Rating} onChange={(e) => setRating(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Age restriction</Form.Label>
                                <Form.Control placeholder="Age restriction" value={Age_restriction} onChange={(e) => setAge_restriction(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Company name</Form.Label>
                                <Form.Control placeholder="Company name" value={company_name} onChange={(e) => setcompany_name(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product price</Form.Label>
                                <Form.Control placeholder="Product price" value={Product_price} onChange={(e) => setProduct_price(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product type</Form.Label>
                                <Form.Control placeholder="Product type" value={Product_type} onChange={(e) => setProduct_type(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Product platform</Form.Label>
                                <Form.Control placeholder="Product platform" value={Product_platform} onChange={(e) => setProduct_platform(e.target.value)}/>
                            </Form.Group>
                           
                            <Button variant="primary" type="submit" value="2" onClick={(e) => setCRUD_type(e.target.value)}>Submit</Button>
                        </Form>
                        <br></br>
                    <Button onClick={close_Update}>CLOSE</Button>
                </Card.Body>
            </Card>            
        </Modal_Update>

        <Modal_Delete>
            <Card style={{ width: '18rem' }} border="danger">
            <Card.Body>
                    <Card.Title>Delete</Card.Title>                    
                        <Card.Text>
                            Please insert data you want to Delete.                            
                        </Card.Text>                       

                        <Form onSubmit={CRUD_Submit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control placeholder="ID" value={Product_ID} onChange={(e) => setProduct_ID(e.target.value)}/>                              
                            </Form.Group>                        

                            <Button variant="primary" type="submit" value="3" onClick={(e) => setCRUD_type(e.target.value)}>Submit</Button>
                        </Form>
                        <br></br>
                    <Button onClick={close_Delete}>CLOSE</Button>
                </Card.Body>
            </Card>            
        </Modal_Delete>       

    </div>    
    );
}
export default SearchFrom;



