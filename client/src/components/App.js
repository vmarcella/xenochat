// React imports 
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Grab the redux store and provider to allow components to access it
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/index';

// Import our components
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Server from './Server/Server';

// Import our assets
import '../assets/css/App.css';

// Create the redux store
const store = createStore(reducers, applyMiddleware(thunk));

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
    },
    {
        path:'/chat',
        component: Server, 
    }
]

// Main application
class App extends Component {
    // Initialize the app with props and set the state
    constructor(props) {
        super(props);
    }

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
            ));     
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
