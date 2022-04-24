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

        <img height="500"  src="https://i.imgur.com/GmxglHl.png"></img>
        <Table striped bordered hover>
            <thead>
            {/* Table row name */}
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
              {/* Output from the database of that user */}                              
                <tr>                   
                    <td>{Data.p_id}</td>
                    <td>{Data.p_name}</td>  
                    <td>{Data.rating}</td>  
                    <td>{Data.age_restriction}</td>  
                    <td>{Data.company_name}</td>  
                    <td>{Data.p_price}</td>  
                    <td>{Data.p_type}</td>  
                    <td>{Data.p_platform}</td> 
                                                    
                </tr>
                
                                                    
            </tbody>
        </Table> 


      </div>          
    );
  }
}
export default ProductView;
