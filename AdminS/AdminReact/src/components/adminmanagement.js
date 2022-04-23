import React from 'react';
import styled from 'styled-components';
import AdminNav from './navigation';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import Button from 'react-bootstrap/Button';

const H1 = styled.h1`
    margin-left: 20px;
`;

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

const PP = styled.p`
    text-align: right;
    margin-right: 50px;
`;

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
        if(Tag === "ID" && KeySearch === data[nA].ID )     
        {
            CurrentResult.push(data[nA]);
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
    console.log(data);
    console.log(data.length);
    console.log(CurrentResult);
    return CurrentResult;        
   
}

function AdminLog() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [KeySearch, setKeySearch] = useState("");
    const [Tag, setTag] = useState("");    
    const [Data,setData] = useState([]);                
    const handleSubmit = (event) => {
        event.preventDefault();
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
        console.log(AllData);
        setData(CheckingSearch(AllData,Tag,KeySearch));                  
        console.log(Data);
    })                                                                    
    }                        
    return (
        <>
        <AdminNav />
        <div class="row">
            <div class="col-md-12">
                <H1>Manage User</H1>
                <Form className="d-flex" onSubmit={handleSubmit}><label>Search user: </label>
                    <input type="text" name="search" />
                    &nbsp;
                    <select onChange={(e) => setTag(e.target.value)}>
                        <option value="Null">Filter</option>
                        <option value="All">All</option>
                        <option value="Username">Username</option>
                        <option value="ID">ID</option>
                        <option value="NickName">Nick Name</option>
                        <option value="Email">Email</option>
                    </select>
                    &nbsp;
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>
                <Button variant="primary" onClick={handleShow}>
                    Add user
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add user into database</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup className="mb-3" controlId="exampleForm.ControlInput1">
                                <FormLabel>Username</FormLabel>
                                <FormControl
                                    type="username"
                                    placeholder="username"
                                    autoFocus
                                />
                            </FormGroup>
                            <FormGroup
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <FormLabel>ID</FormLabel>
                                <FormControl as="textarea" rows={3} />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>Test User Manage</div>
                <TABLE>
                    <tr>
                        <th>Username</th>
                        <th>ID</th>
                        <th>Nick Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>

                    {/* <% for(let i=0; i<UserData.length; i++) { %> */} {/* Require ejs */}
                    <tr>
                        <TD>godallah</TD>
                        <TD>69</TD>
                        <TD>ALLAH</TD>
                        <TD>AllahGod@Universe.42</TD>
                        <TD><button>View</button> <button>Edit</button> <button>Delete</button></TD>
                    </tr>
                    {/* <tbody>
                        {DataTransfer.map(obj => {
                            return (
                                <tr>
                                    <TD>{obj.Username}</TD>
                                    <TD>{obj.ID}</TD>
                                    <TD>{obj.GameName}</TD>
                                    <TD>{obj.Email}</TD>
                                </tr> 
                            );
                        })}
                    </tbody> */}
                    {/* <% } %> */} {/* Require ejs */}
                </TABLE>
            </div>
        </div>
        </>
    )
}

export default AdminLog