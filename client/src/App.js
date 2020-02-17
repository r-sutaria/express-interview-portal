import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: []
        }
    }

    getPassword = () => {
        fetch('/api/passwords')
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .then((password) => {
                this.setState({password});
                console.log(password);
            })
            .catch(err => console.log(err.message()))
    }


    render() {
        return (
            <div className="App">
                <button
                    onClick={this.getPassword}
                >
                    Get password
                </button>
                <div>
                    <ul>
                        {
                            this.state.password.map((item,index) => {
                                return(
                                    <li key={index}>
                                        {item}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
