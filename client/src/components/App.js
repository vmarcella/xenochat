// React imports 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Landing';
import Register from './Register';
import Login from './Login';

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
    },
    {
        path: '/login',
        component: Login,
    }
]

class App extends Component {
    render() {
        // Instantiate routes 
        const createRoutes = () => {
            return routes.map((route, i) => (
                <Route 
                    key={i}
                    exact
                    path={route.path}
                    component={route.component}
                >
                </Route>
            ))     
        }

        return (
        <BrowserRouter>
            <div className="App">
                {createRoutes()}
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
