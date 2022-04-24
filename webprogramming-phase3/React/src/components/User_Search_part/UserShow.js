import React from 'react'
import Table from 'react-bootstrap/Table';

class ProductView extends React.Component {
  render() {
    const {location } = this.props;
    var Data = location.query.id;
   
    //const product = products.find(p => p.id == location.query.id);
   
    console.log(location.query.id);
    console.log(Data);
    console.log(Data.p_id);

    return(      
      <div>       

        <br></br><br></br><br></br>

        <img height="500"  src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"></img>
        <Table striped bordered hover>
            <thead>
                <tr>               
                    <th>Username</th>
                    <th>ID</th>
                    <th>NickName</th>
                    <th>Email</th>             
                </tr>
            </thead>
            <tbody>                               
                <tr>                   
                    <td>{Data.Username}</td>
                    <td>{Data.UserID}</td>  
                    <td>{Data.NickName}</td>  
                    <td>{Data.Email}</td>       
                </tr>                                    
            </tbody>
        </Table> 


      </div>          
    );
  }
}
export default ProductView;
