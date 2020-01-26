import React, { Component } from 'react';
import './LoginCSS.css';
import {getConformLogin} from '../../apiCalls/loginApiCalls'
import {Redirect} from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            toDashboard: false,
        };


        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Login wymagany' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Hasło wymagane'});
        }

        console.log('------------------------------' + this.state.password)
        getConformLogin(this.state).then(res => {
            console.log('asdf' + res.data)
            if(res.data){
                this.setState(() => ({
                    toDashboard: true
                }))
                console.log('qwertytrew3ertytrewert12343234532')
                this.setState({toDashboard: true})
            }else {
                console.log("asdf")
                this.setState({ error: 'Błędny login lub hasło' });
            }
        })
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (

            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                    <label>User Name</label>
                    <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

                    <label>Password</label>
                    <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />

                    <input type="submit" value="Log In" data-test="submit" />
                </form>
            </div>
        );
    }
}

export default LoginPage;
