import React from 'react';
import  ReactDOM  from 'react-dom';

// import BrowserRouter in the form on Router from react-router-dom 
import { BrowserRouter as Router } from 'react-router-dom';
// importing store from redux_store/store and this the variable that we provided in Provider
import store from './redux_store/store'
// importing provider Component from react-redux 
import { Provider } from 'react-redux';

import App from './App';



const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render( <Router>
        {/* Wrapping the entire <App/> component in <Provider/> component and pass store as a
         props and with the variable of store that we importing from redux_store and behind the 
        logic of this is we have access of store in every component inside the <App/> component */}
           <Provider store={store}>
            <App/>
           </Provider>
        </Router>
);


