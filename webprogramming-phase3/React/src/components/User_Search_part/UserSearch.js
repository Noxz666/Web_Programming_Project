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
        if(Tag === "All")  
        {            
            CurrentResult.push(data[nA]);
        }      												
        if(Tag === "Username" && KeySearch === data[nA].Username )     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag === "ID" && KeySearch === data[nA].UserID )     
        {
            CurrentResult.push(data[nA]);
            console.log(data[nA].UserID);
        } 
        if(Tag === "NickName" && KeySearch === data[nA].NickName )     
        {
            CurrentResult.push(data[nA]);
        } 
        if(Tag === "Email" && KeySearch === data[nA].Email )     
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
    const [User_ID, setID] = useState("");
    const [User_name, setUsername] = useState("");    
    const [User_NickName, setNickName] = useState("");    
    const [User_Email, setEmail] = useState("");    

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
        fetch("http://localhost:3001/UserAllData",
        {
            method: 'GET',
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
    
        })       
        .then((res) => res.json())
        .then((UserAllData) => 
        {             
            //console.log(AllData);                                  
            setData(CheckingSearch(UserAllData,Tag,KeySearch));                  
            //console.log(Data);
        })  
                                                                            
    } 

    //Handel CommandList CRUD
    const CRUD_Submit = (event) => {
        event.preventDefault(); 
        console.log("CRUD_type: " + CRUD_type);       
        console.log(User_ID);
        console.log(User_name);      

        switch(CRUD_type) {
            case '1':
                fetch('http://localhost:3001/UserInsert', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Insert_Data: {
                            Username: User_name,
                            UserID: User_ID,
                            NickName: User_NickName,
                            Email: User_Email
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
                console.log("Fucked Update");
                fetch('http://localhost:3001/UserUpdate', 
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Update_Data: {
                            Username: User_name,
                            UserID: User_ID,
                            NickName: User_NickName,
                            Email: User_Email
                        }
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });  
                break;    
            case '3':   
                fetch('http://localhost:3001/UserDelete', 
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Delete_Data: {
                            UserID: User_ID                           
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
                fetch('http://localhost:3001/UserAllData/:id', 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "accept": "application/json"
                    },
                    "body": JSON.stringify({                     
                        Select_ID_Data: {
                            UserID: User_ID                             
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
                        <option value="Null">Filter</option>
                        <option value="All">All</option>
                        <option value="Username">Username</option>
                        <option value="ID">ID</option>
                        <option value="NickName">Nick Name</option>
                        <option value="Email">Email</option>
                </select>                               
                
                <Button variant="outline-success" type="submit">Search</Button>
        </Form>
        <br></br><br></br><br></br>
        <Table striped bordered hover>
            <thead>
            <tr>               
                            <th>Username</th>
                            <th>ID</th>
                            <th>Nick Name</th>
                            <th>Email</th>
                            <th>Edit</th>
            </tr>
            </thead>
            <tbody>
                {Data.map(obj => {
                return (
                    <tr>                   
                        <td>{obj.Username}</td>
                        <td>{obj.UserID}</td>  
                        <td>{obj.NickName}</td>  
                        <td>{obj.Email}</td>   
                        <td>
                        {/* {isOpen ? 'Yes' : 'No'} */}         
                            <ButtonGroup>
                            
                            <Link to={{pathname: `/UserAllData/${obj.UserID}`, query: { id: obj}}}>
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
                                <Form.Label>ID</Form.Label>
                                <Form.Control placeholder="ID" value={User_ID} onChange={(e) => setID(e.target.value)}/>                              
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" value={User_name} onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control placeholder="Nick Name" value={User_NickName} onChange={(e) => setNickName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder="Email" value={User_Email} onChange={(e) => setEmail(e.target.value)}/>
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
                                <Form.Label>ID</Form.Label>
                                <Form.Control placeholder="ID" value={User_ID} onChange={(e) => setID(e.target.value)}/>                              
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Username" value={User_name} onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nick Name</Form.Label>
                                <Form.Control placeholder="Nick Name" value={User_NickName} onChange={(e) => setNickName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder="Email" value={User_Email} onChange={(e) => setEmail(e.target.value)}/>
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
                                <Form.Label>ID</Form.Label>
                                <Form.Control placeholder="ID" value={User_ID} onChange={(e) => setID(e.target.value)}/>                              
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



