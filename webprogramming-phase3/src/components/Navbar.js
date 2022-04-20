import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';

const navbar = () => {

  return (
    <div className="App">
      <Navbar bg="danger" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">"Web-phase3"</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/Search_page">
                    <Nav.Link>Product</Nav.Link>   
                </LinkContainer>                                            
            </Nav>            
          </Navbar.Collapse>
        </Container>
      </Navbar>            
    </div>    
  );
}

export default navbar;
