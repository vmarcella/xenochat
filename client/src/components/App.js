// React imports 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import '../assets/css/App.css';

const routes = [
    {
        path: '/',
        component: 'x'
    }
]

class App extends Component {
    registerRoutes() {

    }
    render() {
        return (
        <BrowserRouter>
            <div className="App">
                {routes.map((route, i) => (
                    <Route
                        key={1}>
                    </Route>
                ))} 
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
