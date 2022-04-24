import React from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useState } from "react";

import DataJSON from '../../Data.json';

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
    console.log(CurrentResult);
    return (
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
        </tr>
        </thead>
        <tbody>
            {CurrentResult.map(obj => {
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
                </tr>
            );
            })}                                     
        </tbody>
    </Table>
    )
}

function SearchFrom () {     

    const [KeySearch, setKeySearch] = useState("");
    const [Tag, setTag] = useState("");               

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
            console.log(AllData);                
            CheckingSearch(DataJSON,Tag,KeySearch)
        })                                                                  
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
        {CheckingSearch(DataJSON,Tag,KeySearch)}       
    </div>    
    );
}
export default SearchFrom;



