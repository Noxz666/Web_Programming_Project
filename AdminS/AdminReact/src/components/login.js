import React from 'react';
//import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function LogIn() {

    let navigate = useNavigate();

    return (
        <div>
            <form>
                <label>ID: </label>
                <input type="text" name="username"/>
                <br />
                <label>Password: </label>
                <input type="text" name="password"/>
                <br />
                <button onClick={() => {navigate('/Adminhomepage')}}>Login</button>
            </form>
        </div>
    )
}

/* class LogIn extends React.Component {

    constructor(info) {
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value});
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>ID: </label>
                <input type="text" name="username" value={this.state.id} onChange={this.handleChange}/>
                <br />
                <label>Password: </label>
                <input type="text" name="password" value={this.state.id} onChange={this.handleSubmit}/>
                <br />
                <button onClick={handleClick}>Log in</button>
            </form>
        )
    }
} */
//ReactDOM.render(<LogIn />, document.getElementById('root'));

export default LogIn