// React imports 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Landing';
import Register from './Register';

// Import our assets
import '../assets/css/App.css';

// setup our route configs 
const routes = [
    {
        path: '/',
        component: Landing,
    },
    {
        path: '/register',
        component: Register,
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
                        key={1}
                        exact
                        path={route.path}
                        component={route.component}
                    >
                    </Route>
                ))} 
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
