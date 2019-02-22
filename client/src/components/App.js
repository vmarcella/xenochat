// React imports 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Grab the redux store and provider to allow components to access it
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from '../reducers/index';

// Import our components
import Landing from './Landing';
import Register from './Register';
import Login from './Login';

// Import our assets
import '../assets/css/App.css';

// Create the redux store
const store = createStore(reducers)

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

// Get the uesr if they're signed in.
const getUser = () => {
    return localStorage.getItem('xenotoken')
}

// Main application
class App extends Component {
    // Initialize the app with props and set the state
    constructor(props) {
        super(props);

        this.state = {
            user: getUser(),
        };
    }

    render() {

        // Instantiate routes 
        const createRoutes = () => {
            return routes.map((route, i) => (
                <Route 
                    key={i}
                    exact
                    path={route.path}
                    render={(routeProps) => (
                    
                        <route.component {...this.state.user}  />
                    )}
                >
                </Route>
            ))     
        }

        return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    {createRoutes()}
                </div>
            </BrowserRouter>
        </Provider>
        );
    }
}

export default App;
